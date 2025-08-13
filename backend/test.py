import os

path = r"C:\Users\Virendra\OneDrive\Documents\Demo\Skin-Disease\backend\skin_disease_model.h5"

print("Checking:", path)
print("Exists:", os.path.exists(path))
print("Absolute path:", os.path.abspath(path))
