# Smart Climate & Eco Insights - Python Backend

"""
This file contains the original Python backend code for the Smart Climate & Eco Insights app.
This code cannot run in the browser but is included for reference.

The frontend simulates the behavior of these functions using JavaScript mock APIs.
To run this backend locally, you need:
1. Python 3.8+
2. google-generativeai package (pip install google-generativeai)
3. A valid Gemini API key
"""

import google.generativeai as genai
import json
from typing import Dict, Any
from datetime import date

# --- CONFIGURATION ---
# IMPORTANT: Replace "YOUR_GEMINI_API_KEY" with your actual key.
# For security and best practice, load this key from an environment variable.
GEMINI_API_KEY = "AIzaSyC6kTXUJ-gpJQAEnfydkoZeAlpiL7vI9nY"
try:
    genai.configure(api_key=GEMINI_API_KEY)
    print("✅ Gemini API configured.")
except Exception as e:
    print(f"❌ Error configuring Gemini API: {e}")
    # Exit or raise error if configuration fails
    # raise

# --- CORE MODELING FUNCTIONS ---

def predict_environmental_data(location: str, date: str) -> Dict[str, Any]:
    """
    Uses the Gemini API to generate a structured, simulated daily prediction
    for various environmental factors like weather and air quality (SPM).
    
    The model is instructed to provide a JSON object for easy processing.
    """
    print(f"\n--- Running Prediction Model for {location} on {date} ---")

    # This system instruction sets the persona and rules for the model.
    system_prompt = (
        "You are a sophisticated climate and air quality prediction model. "
        "Generate realistic, structured daily environmental predictions. "
        "Provide the output STRICTLY as a JSON object."
    )

    # This user query asks for the specific data points.
    user_query = (
        f"Generate a simulated daily forecast for {location} for the date {date}. "
        "Include the following metrics: "
        "Rainfall (mm), Temperature (C), Humidity (%), Wind Speed (km/h), and SPM (μg/m³). "
        "The JSON keys must be: 'rainfall_mm', 'temperature_c', 'humidity_percent', 'wind_speed_kmh', 'spm_ugm3'."
    )

    try:
        model = genai.GenerativeModel("gemini-pro") # Using 'gemini-pro' for general text generation
        
        # Configure the generation to explicitly request JSON output
        response = model.generate_content(
            contents=user_query,
            config=genai.types.GenerateContentConfig(
                system_instruction=system_prompt,
                response_mime_type="application/json"
            )
        )
        
        # Parse the JSON response text
        prediction_data = json.loads(response.text)
        print("✅ Environmental Prediction Generated.")
        return prediction_data
        
    except json.JSONDecodeError as e:
        print(f"🔥 Error: Failed to parse JSON response from Gemini. Raw text: {response.text}")
        return {"error": "JSON Decode Failure", "details": str(e)}
    except Exception as e:
        print(f"🔥 Gemini API Error (Prediction): {e}")
        return {"error": "API Call Failed", "details": str(e)}

def simulate_carbon_cycle(emission_source: str, sequestration_effort: str) -> str:
    """
    Simulates GHG monitoring, carbon sequestration potential, and provides
    commentary on the sustainability balance.
    """
    print(f"\n--- Simulating GHG Monitoring and Sequestration ---")

    prompt = (
        f"Simulate a scenario where we monitor Greenhouse Gas (GHG) emissions from a '{emission_source}' "
        f"and apply a '{sequestration_effort}' sequestration effort. "
        "Provide a detailed, two-paragraph analysis that covers: "
        "1. Estimated daily CO2 emissions (in metric tons). "
        "2. The potential daily carbon sequestration capacity (in metric tons) of the effort. "
        "3. A concluding statement on the overall carbon balance (net positive or negative)."
    )
    
    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)
        print("✅ Carbon Cycle Simulation Generated.")
        return response.text
    except Exception as e:
        print(f"🔥 Gemini API Error (Carbon Cycle): {e}")
        return "Error fetching carbon cycle simulation data."


def model_indoor_plant_performance(plant_name: str, room_size_sqm: float) -> str:
    """
    Generates a report on the CO2 absorbance and O2 emission of an indoor plant
    in a given room size, addressing the 'App generation for CO2 absorbance and
    O2 emissions by different indoor plants' feature.
    """
    print(f"\n--- Modeling Indoor Plant Performance ({plant_name}) ---")
    
    prompt = (
        f"Generate an informational report for an app about the environmental impact of the indoor plant '{plant_name}'. "
        f"Assume the plant is in a standard room of {room_size_sqm} square meters with average light conditions. "
        "The report must include: "
        "1. Estimated CO2 Absorbance Rate (grams per day). "
        "2. Estimated O2 Emission Rate (liters per day). "
        "3. A brief, encouraging summary of its overall air purification benefit."
    )
    
    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(prompt)
        print("✅ Plant Performance Model Generated.")
        return response.text
    except Exception as e:
        print(f"🔥 Gemini API Error (Plant Model): {e}")
        return "Error fetching indoor plant performance data."

# --- MAIN EXECUTION ---
if __name__ == "__main__":
    print("==================================================")
    print("     🌳 VIRTUAL ENVIRONMENTAL MODELING SYSTEM 🌳")
    print("==================================================")

    # 1. Climate Change & Weather/Air Quality Prediction
    location = input("Enter the location:")
    currdate = date.today()
    
    weather_forecast = predict_environmental_data(location, currdate)
    
    if "error" not in weather_forecast:
        print("\n--- Environmental Prediction (Structured Data) ---")
        for key, value in weather_forecast.items():
            print(f"{key.replace('_', ' ').title():<20}: {value}")
        print("-" * 40)
    else:
        print(f"Prediction failed: {weather_forecast['details']}")


    # 2. GHG Monitoring & Carbon Sequestration Modeling
    
    source = "Small industrial factory running 24/7"
    effort = "Afforestation project covering 5 hectares of degraded land"
    
    carbon_report = simulate_carbon_cycle(source, effort)
    
    print("\n--- GHG Monitoring and Carbon Sequestration Report ---")
    print(carbon_report)
    print("-" * 40)
    
    
    # 3. Indoor Plant CO2 Absorbance and O2 Emissions Model (App Content)
    
    plant = "Snake Plant (Sansevieria trifasciata)"
    room_size = 15.0 # square meters
    
    plant_report = model_indoor_plant_performance(plant, room_size)
    
    print(f"\n--- Indoor Plant Performance Report for App ({plant}) ---")
    print(plant_report)
    print("--------------------------------------------------")
