import Observable from './Observable/Observable';
import Computed from './Observable/Computed';

const bindings = {};

const app = () => {
  bindings.first = new Observable("Jeremy");
  bindings.last = new Observable("");
  bindings.full = new Computed(() => `${bindings.first.value} ${bindings.last.value}`.trim(), [bindings.first, bindings.last]);
  applyBindings();
};

// Time for the first render to complete
setTimeout(app, 0);

const applyBindings = () => {
	document.querySelectorAll("[data-bind]").forEach(elem => {
  	const obs = bindings[elem.getAttribute("data-bind")];
    bindValue(elem, obs);
  });
};

const bindValue = (input, observable) => {
  input.value = observable.value;
  observable.subscribe(() => input.value = observable.value);
  input.onkeyup = () => observable.value = input.value;
};