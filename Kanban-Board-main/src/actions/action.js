import axios from "axios";

export const fetchData = () => async (dispatch) => {
  try {
    dispatch({ type: "dataRequest" });

    const { data } = await axios.get(
      "https://api.quicksell.co/v1/internal/frontend-assignment/"
    );

    dispatch({ type: "dataSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "dataFailure" });
  }
};

export const dataSelect = (group, tickets, order) => async (dispatch) => {
  try {
    console.log(group, tickets, order);
    dispatch({ type: "dataSelectRequest" });

    let use = false;
    let se = new Set();
    let arr = [],
      dataSel = [];

    if (order === "title") {
      dataSel.forEach((ele, index) => {
        ele[index]?.value?.sort((a, b) => a.title.localeCompare(b.title));
      });
    }

    if (group === "status") {
      tickets.forEach((ele) => {
        se.add(ele.status);
      });

      arr = [...se];

      arr.forEach((ele, index) => {
        let arr = tickets.filter((filterElement) => {
          return ele === filterElement.status;
        });
        dataSel.push({
          [index]: {
            title: ele,
            value: arr,
          },
        });
      });
    } else if (group === "user") {
      use= true;
      tickets?.users?.forEach((ele, index) => {
        arr = tickets?.tickets?.filter((filterElement) => {
          return ele.id === filterElement.userId;
        });

        dataSel.push({
          [index]: {
            title: ele.name,
            value: arr,
          },
        });
      });
 
    } else {
      let priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];

      priorityList.forEach((ele, index) => {
        arr = tickets.filter((filterElement) => {
          return index === filterElement.priority;
        });

        dataSel.push({
          [index]: {
            title: ele,
            value: arr,
          },
        });
      });
    }

    if (order === "priority") {
      dataSel.forEach((ele, index) => {
        ele[index]?.value?.sort((a, b) => b.priority - a.priority);
      });
    }

    console.log(dataSel);
    dispatch({ type: "dataSelectSuccess", payload: { dataSel, use } });
  } catch (error) {
    dispatch({ type: "dataSelectFai", payload: error.message });
  }
};
