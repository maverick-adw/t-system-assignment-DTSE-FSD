import pandas as pd
from os import path
from problem_statement.main import load_model, predict
from pydantic import BaseModel
from typing import Literal
from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

model = load_model(path.join('problem_statement', 'model.joblib'))
app = FastAPI()


class InputDataModel(BaseModel):
    longitude: float
    latitude: float
    housing_median_age: float
    total_rooms: float
    total_bedrooms: float
    population: float
    households: float
    median_income: float
    ocean_proximity: Literal['NEAR BAY', '<1H OCEAN', 'INLAND', 'NEAR OCEAN', 'ISLAND']


def prepare_df(item: InputDataModel):
    item = item.dict()
    item['ocean_proximity_<1H OCEAN'] = True if item['ocean_proximity'] == '<1H OCEAN' else False
    item['ocean_proximity_INLAND'] = True if item['ocean_proximity'] == 'INLAND' else False
    item['ocean_proximity_ISLAND'] = True if item['ocean_proximity'] == 'ISLAND' else False
    item['ocean_proximity_NEAR BAY'] = True if item['ocean_proximity'] == 'NEAR BAY' else False
    item['ocean_proximity_NEAR OCEAN'] = True if item['ocean_proximity'] == 'NEAR OCEAN' else False

    del item['ocean_proximity']
    item = pd.DataFrame(item, index=[0])

    return item


@app.get('/predict_house_price')
async def predict_house_price(item: InputDataModel):
    try:
        prediction = predict(prepare_df(item), model)
        return JSONResponse(content=jsonable_encoder({"prediction": prediction[0]}),
                            status_code=200)
    except Exception as e:
        return JSONResponse(content=jsonable_encoder({"error": str(e)}),
                            status_code=500)
