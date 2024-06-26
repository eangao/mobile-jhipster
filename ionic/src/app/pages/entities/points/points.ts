import { Component } from '@angular/core';
import { NavController, ToastController, Platform, IonItemSliding } from '@ionic/angular';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { Points } from './points.model';
import { PointsService } from './points.service';

@Component({
  selector: 'page-points',
  templateUrl: 'points.html',
})
export class PointsPage {
  points: Points[];

  // todo: add pagination

  constructor(
    private navController: NavController,
    private pointsService: PointsService,
    private toastCtrl: ToastController,
    public plt: Platform
  ) {
    this.points = [];
  }

  async ionViewWillEnter() {
    await this.loadAll();
  }

  async loadAll(refresher?) {
    this.pointsService
      .query()
      .pipe(
        filter((res: HttpResponse<Points[]>) => res.ok),
        map((res: HttpResponse<Points[]>) => res.body)
      )
      .subscribe(
        (response: Points[]) => {
          this.points = response;
          if (typeof refresher !== 'undefined') {
            setTimeout(() => {
              refresher.target.complete();
            }, 750);
          }
        },
        async (error) => {
          console.error(error);
          const toast = await this.toastCtrl.create({ message: 'Failed to load data', duration: 2000, position: 'middle' });
          await toast.present();
        }
      );
  }

  trackId(index: number, item: Points) {
    return item.id;
  }

  async new() {
    await this.navController.navigateForward('/tabs/entities/points/new');
  }

  async edit(item: IonItemSliding, points: Points) {
    await this.navController.navigateForward('/tabs/entities/points/' + points.id + '/edit');
    await item.close();
  }

  async delete(points) {
    this.pointsService.delete(points.id).subscribe(
      async () => {
        const toast = await this.toastCtrl.create({ message: 'Points deleted successfully.', duration: 3000, position: 'middle' });
        await toast.present();
        await this.loadAll();
      },
      (error) => console.error(error)
    );
  }

  async view(points: Points) {
    await this.navController.navigateForward('/tabs/entities/points/' + points.id + '/view');
  }
}
