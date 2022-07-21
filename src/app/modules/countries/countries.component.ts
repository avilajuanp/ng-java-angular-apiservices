import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from './models/country';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {

  form: FormGroup;
  //además del FormBuilder y la instancia del form arriba, inyecto el servicio
  constructor(private fb: FormBuilder, private countriesService: CountriesService) { } 

  //creo lista de paises que se cargan en el onInit()
  countryList: Country[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({

      //image: new FormControl('', Validators.required),
      image: ['', [Validators.required, Validators.maxLength(40)]],
      name: new FormControl('', Validators.required),
      population: new FormControl('', [Validators.required, Validators.min(0)]), 
      area: new FormControl('', [Validators.required, Validators.min(0)]),
      continentId: new FormControl('', [Validators.required, Validators.min(0)]),

    });
    //al iniciar la app tengo disponible la lista de paises para cargar en el template, me suscribo al observable
    this.countriesService.listCountries().subscribe(res => {
      this.countryList = res;
    });
  }

  get f() {return this.form.controls;}

  saveCountry() {
    //creo un pais nuevo para alojar los datos del form y lo mando al service a guardar
    var country = new Country;

    country.image = this.form.get('image')?.value;
    country.name = this.form.get('name')?.value;
    country.population = this.form.get('population')?.value;
    country.area = this.form.get('area')?.value;
    country.continentId = this.form.get('continentId')?.value;

    //como devuelve un observable, me suscribo y emito un chequeo por consola. Dps reseteo el formulario
    this.countriesService.createCountry(country).subscribe(res => {
      console.log("se guardó el país: "+res);
      this.form.reset();
    },
    error => {
      return console.error('Falló la carga');
    }
    );
  }
  //método para el botón reset para el formulario
  cleanForm() {
    this.form.reset();
  }

}
