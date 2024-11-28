export class TempStorage {
  private dbName = 'tempSurpriseDB';
  private storeName = 'tempFiles';
  private version = 1;

  private async openDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  async saveFiles(files: File[]): Promise<string[]> {
    const db = await this.openDB();
    const transaction = db.transaction(this.storeName, 'readwrite');
    const store = transaction.objectStore(this.storeName);
    
    const fileIds = await Promise.all(files.map(async (file) => {
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await new Promise((resolve, reject) => {
        const request = store.put(file, fileId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      return fileId;
    }));

    return fileIds;
  }

  async getFiles(fileIds: string[]): Promise<File[]> {
    const db = await this.openDB();
    const transaction = db.transaction(this.storeName, 'readonly');
    const store = transaction.objectStore(this.storeName);

    return Promise.all(fileIds.map(async (fileId) => {
      return new Promise<File>((resolve, reject) => {
        const request = store.get(fileId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }));
  }

  async clearAll() {
    const db = await this.openDB();
    const transaction = db.transaction(this.storeName, 'readwrite');
    const store = transaction.objectStore(this.storeName);
    store.clear();
  }
}

export const tempStorage = new TempStorage(); 