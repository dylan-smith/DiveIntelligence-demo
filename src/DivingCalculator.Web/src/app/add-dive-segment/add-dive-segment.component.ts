import { Component } from '@angular/core';
import { DivePlannerService } from '../dive-planner-service/DivePlannerService';
import { BreathingGas } from '../dive-planner-service/BreathingGas';

@Component({
  selector: 'dive-add-dive-segment',
  templateUrl: './add-dive-segment.component.html',
  styleUrls: ['./add-dive-segment.component.scss'],
})
export class AddDiveSegmentComponent {
  newDepth: number;
  descentTime: number | undefined;
  ascentTime: number | undefined;
  newDepthPO2!: number;
  newDepthEND!: number;
  newGas!: BreathingGas;
  newGasSelectedOption: string;
  standardGas: BreathingGas | undefined;

  private DESCENT_RATE = 3; // seconds per meter
  private ASCENT_RATE = 6; // seconds per meter

  constructor(public divePlanner: DivePlannerService) {
    this.newDepth = divePlanner.getCurrentDepth();
    this.calculateNewDepthData();
    this.newGasSelectedOption = 'current';
    this.calculateNewGas();
  }

  calculateNewDepthData(): void {
    this.descentTime = undefined;
    this.ascentTime = undefined;

    if (this.newDepth > this.divePlanner.getCurrentDepth()) {
      this.descentTime = (this.newDepth - this.divePlanner.getCurrentDepth()) * this.DESCENT_RATE;
    }

    if (this.newDepth < this.divePlanner.getCurrentDepth()) {
      this.ascentTime = (this.divePlanner.getCurrentDepth() - this.newDepth) * this.ASCENT_RATE;
    }

    this.newDepthPO2 = this.divePlanner.getCurrentGas().getPO2(this.newDepth);
    this.newDepthEND = this.divePlanner.getCurrentGas().getEND(this.newDepth);
  }

  calculateNewGas(): void {
    if (this.newGasSelectedOption === 'current') {
      this.newGas = this.divePlanner.getCurrentGas();
    }
  }
}
