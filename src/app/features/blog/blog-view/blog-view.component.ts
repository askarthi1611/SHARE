import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit, OnDestroy {

  blog: any = null;
  safeContent!: SafeHtml;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadBlog(id);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadBlog(id: string) {
    this.blogService.getBlogById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.blog = {
            ...res,
            likes: res.likes || 0,
            views: res.views || 0,
            isPlaying: false,
            isLiked: res.likes > 0
          };

          // Auto-increment view count
          this.blogService.viewBlog(id).subscribe();

          // Generate thumbnail & embeds
          this.initMedia();

          // Sanitize content
          this.safeContent = this.sanitizer.bypassSecurityTrustHtml(res.content || '');
        },
        error: (err) => {
          console.error('Error loading blog:', err);
          this.router.navigate(['/blogs']);
        }
      });
  }

  private initMedia() {
    if (this.blog.youtubeLink) {
      const videoId = this.extractYoutubeId(this.blog.youtubeLink);
      this.blog.thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      this.blog.embedUrl = this.getSafeYoutubeUrl(this.blog.youtubeLink);
    }

    if (this.blog.instagramLink) {
      this.blog.instagramId = this.extractInstagramId(this.blog.instagramLink);
      this.blog.instagramEmbedUrl = this.getSafeInstagramUrl(this.blog.instagramLink);
    }
  }

  // Toggle video playback
  toggleVideo() {
    this.blog.isPlaying = !this.blog.isPlaying;
    if (this.blog.isPlaying) {
      this.blogService.viewBlog(this.blog._id).subscribe((updated: any) => {
        this.blog.views = updated.views;
      });
    }
  }

  // Toggle like
  likeBlog() {
    this.blogService.likeBlog(this.blog._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.blog.likes = res.likes;
        this.blog.isLiked = res.likes > 0;
      });
  }

  // Safe YouTube embed
  getSafeYoutubeUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYoutubeId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  // Safe Instagram embed (posts + reels)
  getSafeInstagramUrl(url: string): SafeResourceUrl {
    const id = this.extractInstagramId(url);
    if (!id) return '';

    const isReel = url.includes('/reel/');
    const embedUrl = isReel
      ? `https://www.instagram.com/reel/${id}/embed`
      : `https://www.instagram.com/p/${id}/embed`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  // Enhanced YouTube ID extraction
  private extractYoutubeId(url: string): string {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/,
      /youtube\.com\/embed\/([^&]+)/,
      /v\/([^&]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return '';
  }

  // Enhanced Instagram ID extraction
  extractInstagramId(url: string): string {
    const regExp = /instagram\.com\/(?:p|reel)\/([^\/?]+)/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  }

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // Back navigation
  goBack() {
    this.router.navigate(['/']);
  }

  @ViewChild('instagramIframe') instagramIframe!: ElementRef;

  onInstagramLoad(event: any) {
    const iframe: any = event.target as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      // Listen for Instagram's postMessage height updates
      window.addEventListener('message', this.handleInstagramResize, { passive: true });
    }
  }

  private handleInstagramResize = (event: MessageEvent) => {
    if (event.origin !== 'https://www.instagram.com') return;

    const iframe = this.instagramIframe?.nativeElement as HTMLIFrameElement;
    if (iframe && event.data?.iframe_height) {
      iframe.style.height = `${event.data.iframe_height + 40}px`;
    }
  }

}
