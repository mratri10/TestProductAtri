const initState: HomeData = {
    body: "Atri",
    title: "Rindu",
    id: 1,
  };
  
  export default (
    state: HomeData = initState,
    action: ReduxAction,
  ): HomeData => {
    switch (action.type) {
      case "Data":
        return {
            body: "AtRaniri",
            title: "Rindu",
            id: 1,
          };
      case "Null":
        return {
            body: "Rani",
            title: "Atri",
            id: 1,
          };
  
      default:
        return state;
    }
  };
  
