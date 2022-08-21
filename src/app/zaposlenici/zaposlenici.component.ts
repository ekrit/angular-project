import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";


import {filter} from "rxjs";

@Component({
  selector: 'app-zaposlenici',
  templateUrl: './zaposlenici.component.html',
  styleUrls: ['./zaposlenici.component.css']
})
export class ZaposleniciComponent implements OnInit {

  personData : any = [];
  filter : any;
  odabranaOsoba : any = null;


  ime : string = "";
  prezime : string = "";
  broj_indeksa : string = "";
  mjesto_rodjenja : string = "";
  datum_rodjenja : string = "";

  newOsoba : any = {};

  addPerson() {

    this.newOsoba.ime = this.ime;
    this.newOsoba.prezime = this.prezime;
    this.newOsoba.broj_indeksa = this.broj_indeksa;
    this.newOsoba.opstina_rodjenja_id = 1;
    this.newOsoba.datum_rodjenja = this.datum_rodjenja;

   // console.log(this.newOsoba);

    this.httpKlijent.post("https://restapiexample.wrd.app.fit.ba/Student/Add", this.newOsoba).subscribe( response =>{
        console.log("Osoba dodana");
    })

    this.ime = "";
    this.prezime = "";
    this.broj_indeksa = "";
    this.mjesto_rodjenja = "";
    this.datum_rodjenja  = "";

  }


  constructor( private httpKlijent : HttpClient) { }

  getPersonData():any
  {
    if(this.filter != null)
    {
      return this.filtriraj();
    }
    return this.personData;
  }

  ngOnInit(): void {
    this.httpKlijent.get('https://restapiexample.wrd.app.fit.ba/Student/GetAll').subscribe( x=>
    {
      this.personData = x;
     /* for(let i = 0; i< this.personData.length; i++)
      {
        console.log(this.personData[i].ime);
      } */
    });
  }

  filtriraj() {
    return this.personData.filter((x: any)=> x.ime.length==0 || (x.ime + " " + x.prezime).toLowerCase().startsWith(this.filter.toLowerCase()) || (x.prezime + " " + x.ime).toLowerCase().startsWith(this.filter.toLowerCase()));
  }

  setChosen(x: any) {
    this.odabranaOsoba = x;
    this.pro_pic = null;
   // console.log(this.odabranaOsoba);
  }


  deletePerson(x : any) {
    this.httpKlijent.post("https://restapiexample.wrd.app.fit.ba/Student/Delete/" + x.id, this.odabranaOsoba).subscribe( response=>{
     // console.log("User izbrisan iz baze");

    })
  }

  updatePerson() {
    this.httpKlijent.post("https://restapiexample.wrd.app.fit.ba/Student/Update/" + this.odabranaOsoba.id, this.odabranaOsoba). subscribe( response =>{
     // console.log("Its Updated!")
    })
    this.odabranaOsoba = null;
  }

  pro_pic : any = null;
  pro_pic_id : any = null;

  setPicture(x: any) {
    this.pro_pic = x.slika_studenta;
    this.pro_pic_id = x.id;
    this.odabranaOsoba = null;
  }

  newPic: File | undefined;

  updatePicture() {
    console.log(this.newPic);
    console.log(this.pro_pic);

      const np = new FormData();
      np.append('slika_studenta', <File>this.newPic)

     // console.log(np);

      this.httpKlijent.post("https://restapiexample.wrd.app.fit.ba/Student/AddProfileImage/" + this.pro_pic_id, np).subscribe(response=>{
        //console.log("Picture Updated");
      })

    this.pro_pic = null;
    this.pro_pic_id = null;
    this.newPic = undefined;
  }


  setdata(event : any) {
   // console.log(event);
    this.newPic = <File>event.target.files[0];

    //console.log(event.target.files[0]);
    //console.log("Here I am!");
  }
}


