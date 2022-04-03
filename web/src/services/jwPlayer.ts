export const uploadVideoToJWPlayer = async (url: string, file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const shortcode = (await response.json()).media?.key;

  return shortcode;
};
