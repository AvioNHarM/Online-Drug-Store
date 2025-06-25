import joblib
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split


is_there_existing_model = False
df = ""


def get_diseases_prediction(user_input):
    """
    This function is a placeholder for the actual AI model that predicts diseases based on user information.
    It currently returns a hardcoded list of diseases.
    """

    # data file link https://data.mendeley.com/datasets/2cxccsxydc/1
    df = pd.read_csv(
        "C:\\work\\code\\Personal Projects\\DrugStore\\data\\DiseaseAndSymptomsDataset.csv"
    )

    y = df.drop(columns=["diseases"])
    y = df["diseases"]

    x = df.drop("diseases", axis=1)
    y = df["diseases"]

    X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2)

    user_df = pd.DataFrame([user_input]).astype(int)
    user_df = user_df[X_train.columns]

    if not is_there_existing_model:
        model = RandomForestClassifier()
        model.fit(X_train, y_train)

        return model.predict(user_df)[0]

    model = joblib.load(
        "C:\\work\\code\\Personal Projects\\DrugStore\\test\\ai\\symptom_model.joblib",
    )

    return model.predict(user_df)[0]
