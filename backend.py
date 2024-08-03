from os import path
from typing import Literal

import pandas as pd
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from problem_statement.main import load_model, predict


model = load_model(path.join("problem_statement", "model.joblib"))
app = FastAPI()


class InputDataModel(BaseModel):
    """
    Pydantic validator for API inputs
    """

    longitude: float
    latitude: float
    housing_median_age: float
    total_rooms: float
    total_bedrooms: float
    population: float
    households: float
    median_income: float
    ocean_proximity: Literal["NEAR BAY", "<1H OCEAN", "INLAND", "NEAR OCEAN", "ISLAND"]


def prepare_df(item: InputDataModel) -> pd.DataFrame:
    """
    Prepare data for predict invocation
    """

    item = item.dict()
    item["ocean_proximity_<1H OCEAN"] = item["ocean_proximity"] == "<1H OCEAN"
    item["ocean_proximity_INLAND"] = item["ocean_proximity"] == "INLAND"
    item["ocean_proximity_ISLAND"] = item["ocean_proximity"] == "ISLAND"
    item["ocean_proximity_NEAR BAY"] = item["ocean_proximity"] == "NEAR BAY"
    item["ocean_proximity_NEAR OCEAN"] = item["ocean_proximity"] == "NEAR OCEAN"

    del item["ocean_proximity"]
    item = pd.DataFrame(item, index=[0])

    return item


@app.get("/predict_house_price")
async def predict_house_price(item: InputDataModel) -> JSONResponse:
    """
    Main API endpoint
    """

    try:
        prediction = predict(prepare_df(item), model)
        return JSONResponse(
            content=jsonable_encoder({"prediction": prediction[0]}), status_code=200
        )
    except Exception as e:
        return JSONResponse(
            content=jsonable_encoder({"error": str(e)}), status_code=500
        )
