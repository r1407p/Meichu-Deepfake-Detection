from swagger_server.controllers.analyze_tool_controller import spoof_detector
import sys

def main(file_path):
    try:
        with open(file_path, 'r') as file:
            audio_data = file.read().strip() 
    except FileNotFoundError:
        print(f"Error: File {file_path} not found.")
        sys.exit(1)

    request_data = {
        "reference_id": "REF00000001",
        "audio_data": audio_data,  
        "model_version": "v0"
    }

    res = spoof_detector(request_data)
    response, code, headers = res
    # print(f'response: " {response}')
    print(f'result: {response["result"]}')
    print(f'confidence: {response["confidence"]}')

if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(1)

    file_path = sys.argv[1]
    main(file_path)