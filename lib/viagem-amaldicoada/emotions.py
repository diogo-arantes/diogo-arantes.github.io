# Instale: pip install tensorflow opencv-python
import cv2
import numpy as np
from tensorflow.keras.models import load_model

model = load_model('modelo_emocoes.h5')  # Carregue seu modelo
emocao_labels = ['Feliz 😄', 'Triste 😢', 'Bravo 😠']

cap = cv2.VideoCapture(0)
while True:
    ret, frame = cap.read()
    resized = cv2.resize(frame, (224, 224))
    prediction = model.predict(np.array([resized]))
    emocao = emocao_labels[np.argmax(prediction)]

    cv2.putText(frame, emocao, (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow('Detector de Emoções', frame)

    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()