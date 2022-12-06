from django.shortcuts import render
from django.http import JsonResponse
import face_recognition
import cv2
import json
import numpy as np
from authentication.models import *
# Create your views here.

def recognize_user(request):
    form = json.loads(request.body)
    user = form['email']
    print(user)
    video_capture = cv2.VideoCapture(-1)
    cur_user = User.objects.get(username=user)
    face_encoding = cur_user.face
    face_encoding = face_encoding[1:-1]
    face_encoding = np.fromstring(face_encoding, dtype=float, sep=' ')
    #print(face_encoding)
    

    known_face_encodings = [
        face_encoding
    ]
    known_face_names = [
        user
    ]
    face_locations = []
    face_encodings = []
    face_names = []
    face_set = set()
    process_this_frame = True
    frame_count = 0
    #try:
    while True:
        # Grab a single frame of video
        ret, frame = video_capture.read()
        # print('cam found')
        # Only process every other frame of video to save time
        if process_this_frame:
            # Resize frame of video to 1/4 size for faster face recognition processing
            small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

            # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
            rgb_small_frame = small_frame[:, :, ::-1]
            
            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
            # print('54')
            face_names = []
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = "Unknown"

                # # If a match was found in known_face_encodings, just use the first one.
                # if True in matches:
                #     first_match_index = matches.index(True)
                #     name = known_face_names[first_match_index]

                # Or instead, use the known face with the smallest distance to the new face
                face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = known_face_names[best_match_index]

                face_names.append(name)
                face_set.add(name)

        process_this_frame = not process_this_frame


        if frame_count>=50:
            break
        frame_count+=1

    # Release handle to the webcam
    video_capture.release()
    # print('102')
    # cv2.destroyAllWindows()
    #print(len(face_set))
    if user in face_set and len(face_set)==1:
        return JsonResponse("User face verified", safe=False)
    elif len(face_set)>1:
        return JsonResponse("Multiple people detected", safe=False)
    elif user not in face_set:
        return JsonResponse("user not detected", safe=False)
    #except:
        #return JsonResponse("An error occured, web cam might not be connected", safe=False)