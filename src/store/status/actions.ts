export const requestSuccess = (id: number) => {
  return <const>{
    type: "[status] Success",
    payload: { id },
  };
};

export const requestError = (id: number) => {
  return <const>{
    type: "[status] Error",
    payload: { id },
  };
};

export const resetStatuses = () => {
  return <const>{
    type: '[status] Reset all',
  }
}
