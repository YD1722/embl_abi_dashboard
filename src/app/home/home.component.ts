import { Component, OnInit } from '@angular/core';
import { MoleculeImageGeneratorService } from '../common/services/molecule-image-generator.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public imageGeneratorService: MoleculeImageGeneratorService) {
    this.imageGeneratorService.loadModule();
  }

  ngOnInit(): void {}
}
