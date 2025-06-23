export interface AddToHistoryParams {
  userid: string;
  product_id: string;
}

export interface AddToHistoryResponse {
  message: string;
}
export interface HistoryItemFromAPI {
  product_id: string;
}

export interface HistoryAPIResponse {
  message: string;
  history: HistoryItemFromAPI[];
}
