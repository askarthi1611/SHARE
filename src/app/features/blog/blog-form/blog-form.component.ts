import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../core/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  blogForm!: FormGroup | any;
  blogId!: string | null;
  isLoading = false;
  titleSuggestions: any = {}
  contentView:any=true;
  youtubeView:any=true;
  instagramView:any=true;
  linkView:any=true;
  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let today = new Date();
    const dateTimeFormat: any = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Set to true for AM/PM format
    };

    // Formats to: "Mar 3, 2026, 14:30:05" (example)
    const formattedDateTime = today.toLocaleString('en-US', dateTimeFormat);

    this.titleSuggestions = {
      chatgpt: [`ChatGPT Chat History ${formattedDateTime}`],
      youtube: [`YouTube Video Share ${formattedDateTime}`],
      instagram: [`Instagram Post Share ${formattedDateTime}`],
      link: [`Link Share ${formattedDateTime}`]
    };

    this.initForm();
    this.loadBlog();
  }

  private initForm() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: [''],
      youtubeLink: [''],
      instagramLink: ['']
    });
  }

  private loadBlog() {
    this.blogId = this.route.snapshot.paramMap.get('id');

    if (this.blogId) {
      this.isLoading = true;
      this.blogService.getBlogById(this.blogId).subscribe({
        next: (data) => {
          this.blogForm.patchValue(data);
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.router.navigate(['/']);
        }
      });
    }
  }

  // 🎯 AI Title Suggestions
  setTitleSuggestion(type: 'chatgpt' | 'youtube' | 'instagram' | 'link') {
    const titles = this.titleSuggestions[type];
    switch (type) {
      case 'chatgpt':
        this.blogForm.patchValue({ youtubeLink: '', instagramLink: '' });
        this.youtubeView=false;
        this.instagramView=false;
        this.contentView=true;
        this.linkView=false;
        break;
      case 'youtube':
        this.blogForm.patchValue({ content: '', instagramLink: '' });
        this.contentView=false;
        this.instagramView=false;
        this.youtubeView=true;
        this.linkView=false;
        break;
      case 'instagram':
        this.blogForm.patchValue({ content: '', youtubeLink: '' });
        this.contentView=false;
        this.youtubeView=false;
        this.instagramView=true;
        this.linkView=false;
        break;
      case 'link':
        this.blogForm.patchValue({ content: '', youtubeLink: '', instagramLink: '' });
        this.contentView=false;
        this.youtubeView=false;
        this.instagramView=false;
        this.linkView=true;
        break;
    }
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    this.blogForm.patchValue({ title: randomTitle });
  }

  // ⌨️ Enter Title + Focus Next
  onTitleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
      // Focus content textarea
      setTimeout(() => {
        const contentField = document.querySelector('textarea[formControlName="content"]') as HTMLTextAreaElement;
        contentField?.focus();
      }, 100);
    }
  }

  save() {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const blogData = this.blogForm.value;

    if (this.blogId) {
      this.blogService.updateBlog(this.blogId, blogData).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.blogService.createBlog(blogData).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  get f() {
    return this.blogForm.controls;
  }
  isValidYouTubeUrl(url: string): boolean {
    return /(?:youtube\.com\/watch\?v=|youtu\.be\/)/.test(url);
  }

  isValidInstagramUrl(url: string): boolean {
    return /instagram\.com\/(?:p|reel)\//.test(url);
  }

}
