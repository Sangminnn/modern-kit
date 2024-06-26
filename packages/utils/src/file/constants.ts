export const MIME_TYPES = [
  'application/json',
  'application/javascript',
  'application/pdf',
  'application/xml',
  'application/zip',
  'application/x-www-form-urlencoded',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'audio/mpeg',
  'audio/ogg',
  'audio/wav',
  'audio/webm',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'text/css',
  'text/html',
  'text/plain',
  'text/xml',
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm',
] as const;

export type MIMEType = (typeof MIME_TYPES)[number];

export const CANVAS_IMAGE_TYPE_TO_FORMAT_MAPPER = {
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
} as const;

export type CanvasImageType = keyof typeof CANVAS_IMAGE_TYPE_TO_FORMAT_MAPPER;
