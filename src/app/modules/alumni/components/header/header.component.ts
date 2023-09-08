import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/core/shared/services/auth.service';
import { AlumniService } from '../../shared/services/alumni.service';

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
      title: 'Surveys',
      route: 'surveys',
      icon: 'fal fa-scroll',
    },
    {
      title: 'Events',
      route: 'events',
      icon: 'fal fa-newspaper',
    },
    {
      title: 'About',
      route: 'about',
      icon: 'fal fa-pallet',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private alumniService: AlumniService
  ) {}

  ngOnInit(): void {
    this.getUser();
    window.addEventListener('scroll', this.listenScrollEvent);

    const route = this.route.snapshot.children[0].routeConfig?.path;
    route == '' ? (this.currentRoute = '/') : (this.currentRoute = route);
  }

  getCurrentRouteURL(route: any) {
    route == '' ? (this.currentRoute = '/') : (this.currentRoute = route);

    this.openCloseNavOverlay();
  }

  getUser() {
    this.alumniService.getProfile().subscribe(
      (response: any) => {
        this.user = response.user;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.authService.logout('alumni');
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
