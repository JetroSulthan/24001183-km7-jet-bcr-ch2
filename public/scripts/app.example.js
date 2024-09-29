class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
    this.driver = document.getElementById("driver");
    this.date = document.getElementById("date");
    this.pickUp = document.getElementById("time");
    this.passenger = document.getElementById("passenger");
  }

  async init() {
    await this.load();

    // Register click listener
    this.loadButton.onclick = this.run;
  }

  runFilter = async () => {
    this.clear();
    if (this.mandatoryCheck()) {
        await this.loadFilter();
        this.run();
    } else {
      
    }
  };

  mandatoryCheck() {
    return (
        this.driver.value !== "" &&
        this.date.value !== "" &&
        this.pickUp.value !== ""
    );
}

  run = () => {
    if (Car.list.length === 0) {
      this.showErrorMessage("No cars found matching your criteria");
    } else {
      Car.list.forEach((car) => {
          const node = document.createElement("div");
          node.classList.add("col-lg-4");
          node.innerHTML = car.render();
          this.carContainerElement.appendChild(node);
      });
    }
  };
  
  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  async loadFilter() {
    const cars = await Binar.listCars((car) => {
        const dateValidate = new Date(car.availableAt).getTime();
        const date = new Date(
            `${this.date.value} ${this.pickUp.value}`
        ).getTime();
        const checkWaktu = dateValidate >= date;
        const availableAt =
            this.driver.value === "1" ? car.available : true;
        const notAvailableAt =
            this.driver.value === "2" ? !car.available : true;
        const passenger =
            this.passenger.value !== ""
                ? car.capacity >= parseInt(this.passenger.value)
                : true;

        return availableAt && notAvailableAt && checkWaktu && passenger;
    });

    Car.init(cars);
}


  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
