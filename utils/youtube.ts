export function extractYoutubeVideoId(url: string): string | null {
  if (!url) return null;

  // Padrões possíveis de URL do YouTube
  const patterns = [
    // youtu.be/ID
    /youtu\.be\/([^?]+)/,
    // youtube.com/watch?v=ID
    /youtube\.com\/watch\?v=([^&]+)/,
    // youtube.com/v/ID
    /youtube\.com\/v\/([^?]+)/,
    // youtube.com/embed/ID
    /youtube\.com\/embed\/([^?]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
} 