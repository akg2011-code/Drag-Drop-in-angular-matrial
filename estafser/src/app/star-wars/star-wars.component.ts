import { ThePeopleService } from './../services/the-people.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDrag, CdkDropList, CdkDropListGroup, CdkDragMove, moveItemInArray } from "@angular/cdk/drag-drop";
import { ViewportRuler } from '@angular/cdk/scrolling';
import { plantOfpeople } from '../interfaces/plantOfpeple';


@Component({
  selector: 'star-wars',
  templateUrl: './star-wars.component.html',
  styleUrls: ['./star-wars.component.css']
})
export class StarWarsComponent {
  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  //will be shown instead of the real element as it's being dragged inside a cdkDropList
  @ViewChild(CdkDropList) placeholder: CdkDropList;

  allPeople: any[];
  allPlants: any[];
  PP: plantOfpeople[]=[];

  public target: CdkDropList;
  public targetIndex: number;
  public source: CdkDropList;
  public sourceIndex: number;
  public dragIndex: number;
  public activeContainer;
  name: string;
  constructor(
    private service: ThePeopleService,
    private viewportRuler: ViewportRuler
  ) {
    this.target = null;
    this.source = null;
  }

  ngOnInit() {
    this.getAllPeople();
    this.getAllPlants();

    //delay function of homworld because it get data from anthor function which get data from api
    setTimeout(() => {
      this.homeWorld();
    }, 500);
  }

  //get all people
  getAllPeople() {
    return this.service.getAllPeople().subscribe(
      data => this.allPeople = data
    );
  }

  // get all plants
  getAllPlants() {
    return this.service.getAllPlants().subscribe(
      data => this.allPlants = data
    );
  }

  //get name of plant which home world urls   
  homeWorld() {
    let obj = this.allPeople
    for (let i in obj) {
      let names = this.allPlants
      for (let j in names) {
        if (obj[i].homeworld == names[j].url) {
           let nameOfplants : Array<plantOfpeople> = [new plantOfpeople(''+names[j].name+'')]
           for(let k in nameOfplants){
             this.PP.push(nameOfplants[k])
           }
        }
      }
    }
  }


  //search by name
  doSearch() {
    if (this.name != "") {
      this.allPeople = this.allPeople.filter(x => {
        return x.name.toLowerCase().match(this.name.toLowerCase());
      });
    }
    else if (this.name == "") {
      this.ngOnInit();
    }
  }

  ngAfterViewInit() {
    let phElement = this.placeholder.element.nativeElement;

    phElement.style.display = 'none';
    phElement.parentElement.removeChild(phElement);
  }

//move card when dragging
  dragMoved(e: CdkDragMove) {
    let point = this.getPointerPositionOnPage(e.event);

    this.listGroup._items.forEach(dropList => {
      if (__isInsideDropListClientRect(dropList, point.x, point.y)) {
        this.activeContainer = dropList;
        return;
      }
    });
  }

  //re arrange cards after moving
  dropListDropped($event:any) {
    if (!this.target)
      return;

    let phElement = this.placeholder.element.nativeElement;
    let parent = phElement.parentElement;

    phElement.style.display = 'none';

    parent.removeChild(phElement);
    parent.appendChild(phElement);
    parent.insertBefore(this.source.element.nativeElement, parent.children[this.sourceIndex]);

    this.target = null;
    this.source = null;

    if (this.sourceIndex != this.targetIndex)
      moveItemInArray(this.allPeople, this.sourceIndex, this.targetIndex);
  }

  // sends a CdkDrag and CdkDropList
  dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    if (drop == this.placeholder)
      return true;

    if (drop != this.activeContainer)
      return false;

    let phElement = this.placeholder.element.nativeElement;
    let sourceElement = drag.dropContainer.element.nativeElement;
    let dropElement = drop.element.nativeElement;

    let dragIndex = __indexOf(dropElement.parentElement.children, (this.source ? phElement : sourceElement));
    let dropIndex = __indexOf(dropElement.parentElement.children, dropElement);

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;

      phElement.style.width = sourceElement.clientWidth + 'px';
      phElement.style.height = sourceElement.clientHeight + 'px';

      sourceElement.parentElement.removeChild(sourceElement);
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    phElement.style.display = '';
    dropElement.parentElement.insertBefore(phElement, (dropIndex > dragIndex
      ? dropElement.nextSibling : dropElement));

    this.placeholder.enter(drag, drag.element.nativeElement.offsetLeft, drag.element.nativeElement.offsetTop);
    return false;
  }

  /** Determines the point of the page that was touched by the user. */
  getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
    // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
    const point = __isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
    const scrollPosition = this.viewportRuler.getViewportScrollPosition();

    return {
      x: point.pageX - scrollPosition.left,
      y: point.pageY - scrollPosition.top
    };
  }
}

function __indexOf(collection, node) {
  return Array.prototype.indexOf.call(collection, node);
};

/** Determines whether an event is a touch event. */
function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type.startsWith('touch');
}

function __isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
  const { top, bottom, left, right } = dropList.element.nativeElement.getBoundingClientRect();
  return y >= top && y <= bottom && x >= left && x <= right;
}

