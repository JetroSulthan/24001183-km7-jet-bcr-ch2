class App {
  constructor() {
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
        await this.proccesFilter();
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

  async proccesFilter() {
    const cars = await Binar.listCars((car) => {
      const carAvailableAt = new Date(car.availableAt).getTime();
      const dateSelect = new Date(`${this.date.value} ${this.pickUp.value}`).getTime();
      const validDate = carAvailableAt >= dateSelect;
      const driverAvailable = this.driver.value === "1" ? car.available : true;
      const driverNotAvailable = this.driver.value === "2" ? !car.available : true;
      const capacityCar = this.passenger.value !== ""
      ? car.capacity >= parseInt(this.passenger.value)
      : true;

      return validDate && driverAvailable && driverNotAvailable && capacityCar;
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
