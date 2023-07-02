import { Pipe, PipeTransform } from '@angular/core';
// @ts-ignore
import { marked } from 'marked';

@Pipe({ name: 'markdown', standalone: true })
export class MarkdownPipe implements PipeTransform {
  transform(content: string): string {
    return marked(content, { sanitize: true });
  }
}
