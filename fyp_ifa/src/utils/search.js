import Cardiogram from "../Components/PlotECG";

export function filterSearch(array = [], patientName) {
  return array.filter((item) => {
    return item === patientName;
  });
}
