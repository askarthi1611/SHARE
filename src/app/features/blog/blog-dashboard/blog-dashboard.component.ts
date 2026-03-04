import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  HostListener
} from '@angular/core';
import { BlogService } from '../../../core/services/blog.service';
import { Blog } from '../blog.model';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-dashboard',
  templateUrl: './blog-dashboard.component.html',
  styleUrls: ['./blog-dashboard.component.css']
})
export class BlogDashboardComponent implements OnInit, AfterViewInit {

  blogs: Blog[] | any = [];
  isLoading = true;

  @ViewChildren('cardRef') cards!: QueryList<ElementRef>;

  constructor(
    private blogService: BlogService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadBlogs();
  }

  ngAfterViewInit(): void {
    this.initScrollReveal();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleResponsiveVideos();
  }

  loadBlogs() {
    this.isLoading = true;
    this.blogs = []; // Reset blogs

    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data.map((blog: any) => ({
          ...blog,
          likes: blog.likes || 0,
          views: blog.views || 0,
          isPlaying: false,
          isLiked: blog.likes > 0
        }));

        // Generate thumbnails
        this.blogs.forEach((blog: any) => {
          if (blog.youtubeLink) {
            const videoId = this.extractYoutubeId(blog.youtubeLink);
            blog.thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            blog.embedUrl = this.getSafeYoutubeUrl(blog.youtubeLink);
          }
          if (blog.instagramLink) {
            blog.instagramId = this.extractInstagramId(blog.instagramLink);
            blog.instagramEmbedUrl = this.getSafeInstagramUrl(blog.instagramLink);
          }
        });

        this.isLoading = false;
        setTimeout(() => this.initScrollReveal(), 100);
      },
      error: (err) => {
        console.error('Error loading blogs:', err);
        this.isLoading = false;
      }
    });
  }

  // Toggle video play/pause
  togglePlay(blog: any) {
    blog.isPlaying = !blog.isPlaying;
    if (blog.isPlaying) {
      this.blogService.viewBlog(blog._id).subscribe((updated: any) => {
        blog.views = updated.views;
      });
    }
  }

  // Toggle like
  toggleLike(blog: any) {
    this.blogService.likeBlog(blog._id).subscribe((updated: any) => {
      blog.likes = updated.likes;
      blog.isLiked = updated.likes > 0;
    });
  }

  // Delete blog
  delete(blog: any) {
    if (confirm("Delete this blog? This action cannot be undone.")) {
      this.blogService.deleteBlog(blog._id).subscribe({
        next: () => {
          this.blogs = this.blogs.filter((b: any) => b._id !== blog._id);
        },
        error: (err) => {
          console.error('Delete failed:', err);
          alert('Failed to delete blog');
        }
      });
    }
  }

  // Safe YouTube embed URL
  getSafeYoutubeUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYoutubeId(url);
    const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  // Safe Instagram embed URL
  getSafeInstagramUrl(url: string): SafeResourceUrl {
    const id = this.extractInstagramId(url);
    if (!id) return '';

    // Handle both posts and reels
    const isReel = url.includes('/reel/');
    const embedUrl = isReel
      ? `https://www.instagram.com/reel/${id}/embed`
      : `https://www.instagram.com/p/${id}/embed`;

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  // Extract YouTube ID
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

  // Extract Instagram ID (posts and reels)
  extractInstagramId(url: string): string {
    // Posts: /p/ABC123/
    // Reels: /reel/ABC123/
    const regExp = /instagram\.com\/(?:p|reel)\/([^\/?]+)/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  }

  // Safe HTML for content preview
  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  // Scroll reveal animation
  private initScrollReveal() {
    if (!this.cards || !this.cards.length) return;

    // const observer = new IntersectionObserver((entries) => {
    //   entries.forEach((entry, index) => {
    //     if (entry.isIntersecting) {
    //       setTimeout(() => {
    //         entry.target.classList.add('show');
    //       }, index * 100);
    //     }
    //   });
    // }, {
    //   threshold: 0.1,
    //   rootMargin: '0px 0px -50px 0px'
    // });

    // this.cards.forEach(card => observer.observe(card.nativeElement));
  }

  // Handle responsive video sizing
  private handleResponsiveVideos() {
    // Pause all videos on resize for mobile
    this.blogs.forEach((blog: any) => {
      if (blog.isPlaying && window.innerWidth < 768) {
        blog.isPlaying = false;
      }
    });
  }

  // Refresh blogs (pull to refresh for PWA)
  refreshBlogs() {
    this.loadBlogs();
  }

  trackByBlogId(index: number, blog: any): string {
    return blog._id;
  }

}
