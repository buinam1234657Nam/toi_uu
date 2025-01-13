export default function basicXSSSanitizer(input: string): string {
  if (typeof input !== 'string') {
    return '';  // Trả về chuỗi rỗng cho đầu vào không phải là chuỗi
  }
  let sanitized = input;
  // 1. Thoát các ký tự HTML
  sanitized = sanitized.replace(/</g, '&lt;');
  sanitized = sanitized.replace(/>/g, '&gt;');
  sanitized = sanitized.replace(/&/g, '&amp;');
  sanitized = sanitized.replace(/"/g, '&quot;');
  sanitized = sanitized.replace(/'/g, '&#x27;');

  // 2. Loại bỏ hoặc vô hiệu hóa các trình xử lý sự kiện JavaScript (ví dụ: `onclick`, `onload`, v.v.)
  sanitized = sanitized.replace(/on\w+="[^"]*"/gi, '');
  sanitized = sanitized.replace(/on\w+='[^']*'/gi, '');
  sanitized = sanitized.replace(/on\w+=`[^`]*`/gi, ''); // Xử lý các chuỗi mẫu JavaScript

  // 3. Loại bỏ các thẻ <script> (bao gồm các biến thể)
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // 4. Loại bỏ các thẻ <iframe>
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');

  // 5. Loại bỏ các thuộc tính style
  sanitized = sanitized.replace(/style="[^"]*"/gi, '');
  sanitized = sanitized.replace(/style='[^']*'/gi, '');

  // 6. Loại bỏ các liên kết javascript:
  sanitized = sanitized.replace(/javascript:/gi, '');

  // 7. Loại bỏ dấu backticks từ các chuỗi mẫu JavaScript
  sanitized = sanitized.replace(/`/g, '&#x60;');

  return sanitized;
}