import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentRoute: any;

  routesArr: any = [
    {
      title: 'Dashboard',
      route: '/',
      icon: 'fal fa-chart-line',
    },
    {
      title: 'Analytics',
      route: 'analytics',
      icon: 'pi pi-chart-bar',
    },
    {
      title: 'Alumni',
      route: 'alumni',
      icon: 'fal fa-id-card',
    },
    {
      title: 'Events',
      route: 'events',
      icon: 'fal fa-newspaper',
    },
    {
      title: 'Surveys',
      route: 'surveys',
      icon: 'fal fa-scroll',
    },
    {
      title: 'Files',
      route: 'files',
      icon: 'fal fa-folder-tree',
    },
    {
      title: 'Logs',
      route: 'logs',
      icon: 'fal fa-pallet',
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentRouteURL(this.route.snapshot.children[0].routeConfig?.path);
  }

  goUser(data: any) {
    this.router.navigate(
      [`/admin/${data.route}`],
      { queryParams: { type: data.params } }
    );
  }


  ngDoCheck(): void{
    this.getCurrentRouteURL(this.route.snapshot.children[0].routeConfig?.path);
  }

  getCurrentRouteURL(route: any) {
    route == '' ? (this.currentRoute = '/') : (this.currentRoute = route);
  }
}
