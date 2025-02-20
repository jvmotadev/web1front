import React, { useEffect, useRef } from "react";
import moment, { Moment } from "moment";
import "./calendar.css";

type Event = {
  eventName: string;
  calendar: string;
  color: string;
  date?: Moment;
};

type CalendarProps = {
  events: Event[];
};

class CalendarClass {
  el: HTMLElement | null;
  events: Event[];
  current: Moment;
  header: HTMLElement | null = null;
  title: HTMLElement | null = null;
  month: HTMLElement | null = null;
  next: boolean = false;

  constructor(selector: string, events: Event[]) {
    this.el = document.querySelector(selector);
    this.events = events.map((ev) => ({
      ...ev,
      date: ev.date || moment(),
    }));
    this.current = moment().date(1);

    if (this.el) {
      this.draw();
      const todayElement = this.el.querySelector(".today") as HTMLElement | null;
      if (todayElement) {
        setTimeout(() => this.openDay(todayElement), 500);
      }
    }
  }

  draw() {
    this.clearPreviousContent(); // Ensure no lingering elements
    this.drawHeader();
    this.drawMonth();
    this.drawLegend();
  }

  clearPreviousContent() {
    if (this.el) {
      const existingHeader = this.el.querySelector(".header");
      const existingMonth = this.el.querySelector(".month");

      if (existingHeader) this.el.removeChild(existingHeader);
      if (existingMonth) this.el.removeChild(existingMonth);
    }
  }

  drawHeader() {
    if (!this.el) return;

    this.header = createElement("div", "header");
    this.title = createElement("h1", undefined, this.current.format("MMMM YYYY"));

    const right = createElement("div", "right");
    right.addEventListener("click", () => this.nextMonth());

    const left = createElement("div", "left");
    left.addEventListener("click", () => this.prevMonth());

    this.header.appendChild(this.title);
    this.header.appendChild(right);
    this.header.appendChild(left);
    this.el.appendChild(this.header);
  }

  drawMonth() {
    if (!this.el) return;

    this.month = createElement("div", "month");
    this.el.appendChild(this.month);

    this.renderMonth();
  }

  renderMonth() {
    this.backFill();
    this.currentMonth();
    this.forwardFill();

    setTimeout(() => {
      if (this.month) {
        this.month.className = `month in ${this.next ? "next" : "prev"}`;
      }
    }, 16);
  }

  backFill() {
    const clone = this.current.clone();
    const dayOfWeek = clone.day();

    if (!dayOfWeek) return;

    clone.subtract(dayOfWeek, "days");
    for (let i = 0; i < dayOfWeek; i++) {
      this.drawDay(clone.clone());
      clone.add(1, "day");
    }
  }

  currentMonth() {
    const clone = this.current.clone();
    while (clone.month() === this.current.month()) {
      this.drawDay(clone.clone());
      clone.add(1, "day");
    }
  }

  forwardFill() {
    const clone = this.current.clone().endOf("month");
    const dayOfWeek = clone.day();

    if (dayOfWeek === 6) return;

    clone.add(1, "day");
    for (let i = dayOfWeek; i < 6; i++) {
      this.drawDay(clone.clone());
      clone.add(1, "day");
    }
  }

  drawDay(day: Moment) {
    if (!this.month) return;

    let week = this.month.querySelector(".week:last-child");
    if (!week || day.day() === 0) {
      week = createElement("div", "week");
      this.month.appendChild(week);
    }

    // Avoid duplicate days
    const existingDay = Array.from(week.children).find(
      (child) => child.querySelector(".day-number")?.textContent === day.format("DD")
    );
    if (existingDay) return;

    const outer = createElement("div", this.getDayClass(day));
    outer.addEventListener("click", () => this.openDay(outer));

    const name = createElement("div", "day-name", day.format("ddd"));
    const number = createElement("div", "day-number", day.format("DD"));
    const events = createElement("div", "day-events");

    this.drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(number);
    outer.appendChild(events);

    week.appendChild(outer);
  }

  drawEvents(day: Moment, element: HTMLElement) {
    const todaysEvents = this.events.filter((ev) =>
      ev.date?.isSame(day, "day")
    );
  
    todaysEvents.forEach((ev) => {
      const eventSpan = createElement("span", `event-category ${ev.color}`); // Agora ev.color é a classe CSS
      element.appendChild(eventSpan);
    });
  }
  

  drawLegend() {
    if (!this.el) return;

    const existingLegend = this.el.querySelector(".legend");
    if (existingLegend) this.el.removeChild(existingLegend);

    const legend = createElement("div", "legend");

    const uniqueCalendars = Array.from(
      new Set(this.events.map((ev) => `${ev.calendar}|${ev.color}`))
    );

    uniqueCalendars.forEach((calendar) => {
      const [name, color] = calendar.split("|");
      const entry = createElement("span", `entry ${color}`, name);
      legend.appendChild(entry);
    });

    this.el.appendChild(legend);
  }

  getDayClass(day: Moment) {
    const classes = ["day"];
    if (day.month() !== this.current.month()) {
      classes.push("other");
    } else if (moment().isSame(day, "day")) {
      classes.push("today");
    }
    return classes.join(" ");
  }

  nextMonth() {
    this.current.add(1, "month");
    this.next = true;
    this.draw();
  }

  prevMonth() {
    this.current.subtract(1, "month");
    this.next = false;
    this.draw();
  }

  openDay(el: HTMLElement) {
    // Verifica se o dia já está aberto
    if (el.classList.contains("open")) {
      return; // Se já estiver aberto, não faz nada
    }
  
    // Fecha qualquer outro dia que esteja aberto
    const previouslyOpenDay = this.el?.querySelector(".day.open");
    if (previouslyOpenDay) {
      previouslyOpenDay.classList.remove("open");
      const existingDetails = previouslyOpenDay.parentElement?.querySelector(".details");
      if (existingDetails) {
        existingDetails.parentElement?.removeChild(existingDetails);
      }
    }
  
    // Marca o dia como aberto
    el.classList.add("open");
  
    const dayNumber = parseInt(
      el.querySelector(".day-number")?.textContent || "1",
      10
    );
    const day = this.current.clone().date(dayNumber);
  
    // Cria o contêiner de detalhes
    const details = createElement("div", "details in");
    const arrow = createElement("div", "arrow");
  
    details.appendChild(arrow);
    el.parentNode?.appendChild(details);
  
    // Filtra os eventos do dia e renderiza
    const todaysEvents = this.events.filter((ev) =>
      ev.date?.isSame(day, "day")
    );
    this.renderEvents(todaysEvents, details);
  
    // Posiciona a seta corretamente
    arrow.style.left = `${el.offsetLeft - (el.parentElement?.offsetLeft || 0) + 27}px`;
  }
  
  
  
  scrollToEvent(eventName: string) {
    const targetElement = document.getElementById(eventName);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  
      // Remove a classe para reiniciar a animação, se já estiver aplicada
      targetElement.classList.remove("blink-2");
  
      // Usa um timeout para garantir que a classe seja reanexada após a remoção
      setTimeout(() => {
        targetElement.classList.add("blink-2");
      }, 50);
    }
  }
  
  

  renderEvents(events: Event[], details: HTMLElement) {
    const wrapper = createElement("div", "events");
  
    if (events.length === 0) {
      const emptyEvent = createElement("div", "event empty", "Não há gastos planejados para esta data");
      wrapper.appendChild(emptyEvent);
    } else {
      events.forEach((ev) => {
        const eventDiv = createElement("div", "event");
        const category = createElement("div", `event-category ${ev.color}`);
        const span = createElement("span", undefined, ev.eventName);
  
        // Adiciona listener para scrollToEvent
        eventDiv.addEventListener("click", () => {
          this.scrollToEvent(ev.eventName);
        });
  
        eventDiv.appendChild(category);
        eventDiv.appendChild(span);
        wrapper.appendChild(eventDiv);
      });
    }
  
    details.appendChild(wrapper);
  }
  
  
}

function createElement(tag: string, className?: string, textContent?: string): HTMLElement {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (calendarRef.current) {
      new CalendarClass("#calendar", events);
    }
  }, [events]);

  return <div id="calendar" ref={calendarRef}></div>;
};

export default Calendar;
