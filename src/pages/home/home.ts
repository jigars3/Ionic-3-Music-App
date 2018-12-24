import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController } from 'ionic-angular';
import { MusicsProvider } from '../../providers/musics/musics';
import { SocialSharing } from '@ionic-native/social-sharing';
import {MusicPlayerPage} from "../music-player/music-player";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allMusic:any = [];
  constructor(public navCtrl: NavController, 
    private musicProvider: MusicsProvider, 
    public loadingController:LoadingController,
    private actionSheetControllet: ActionSheetController,
    private socialSharing: SocialSharing) {
    
  }

  ionViewDidLoad(){
    let allMusicLoadingController = this.loadingController.create({
      content:"Getting songs from server"
    });
    allMusicLoadingController.present();
    this.musicProvider.getMusic()
      .subscribe((musicList) =>
      { 
        allMusicLoadingController.dismiss();
        this.allMusic = musicList});
  }
  shareSong(music){
    let shareSongActionSheet = this.actionSheetControllet.create({
      title:"Share song",
      buttons:[
        {
          text:"Share on Facebook",
          icon:"logo-facebook",
          handler:()=>{
            this.socialSharing.shareViaFacebook(music.name,music.image,music.music_url)
          }
        },
        {
          text:"Twitter",
          icon:"logo-twitter",
          handler:()=>{
            this.socialSharing.shareViaTwitter(music.name,music.image,music.music_url)
          }
        },
        {
          text:"Share",
          icon:"share",
          handler:()=>{
            this.socialSharing.share(music.name,"",music.image,music.music_url);
          }
        },
        {
          text:"Cancel",
          role:"destrucive"
        }
      ]
    });
    shareSongActionSheet.present();
  }

  goToMusic(music){
    this.navCtrl.push(MusicPlayerPage, {
      music:music
    });
  }

}
