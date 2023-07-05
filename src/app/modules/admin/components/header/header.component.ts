import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/core/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isNavOpen: boolean = false;
  currentRoute: any;
  onScroll: boolean = false;
  user: any = [];
  defaultImg: any = '../../../../../assets/images/student.png';

  notifications: any = [];

  routesArr: any = [
    {
      title: 'Dashboard',
      route: '/',
      icon: 'fal fa-chart-line',
    },
    {
      title: 'Alumni',
      route: 'alumni',
      icon: 'fal fa-pallet',
    },
    {
      title: 'Jobs',
      route: 'jobs',
      icon: 'fal fa-pallet',
    },
    {
      title: 'Events',
      route: 'events',
      icon: 'fal fa-pallet',
    },
    {
      title: 'Surveys',
      route: 'surveys',
      icon: 'fal fa-pallet',
    },
    {
      title: 'Logs',
      route: 'logs',
      icon: 'fal fa-pallet',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    window.addEventListener('scroll', this.listenScrollEvent);

    const route = this.route.snapshot.children[0].routeConfig?.path;
    route == '' ? (this.currentRoute = '/admin/') : (this.currentRoute = route);
  }

  getCurrentRouteURL(route: any) {
    route == '' ? (this.currentRoute = '/admin/') : (this.currentRoute = route);

    this.openCloseNavOverlay();
  }

  logout() {
    this.authService.logout('admin');
  }

  openCloseNavOverlay() {
    if (this.isNavOpen) {
      this.isNavOpen = false;
      return;
    }

    this.isNavOpen = true;
  }

  listenScrollEvent = () => {
    window.scrollY > 15 ? (this.onScroll = true) : (this.onScroll = false);
  };
}