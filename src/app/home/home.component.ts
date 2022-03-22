import {Component, OnInit} from '@angular/core';
import {MoleculeImageGeneratorService} from '../common/service/molecule-image-generator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public rdkitService: MoleculeImageGeneratorService) {
    this.rdkitService.loadModule();
  }

  ngOnInit(): void {}
}
