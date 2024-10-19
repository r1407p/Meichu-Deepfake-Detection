import torch
import torch.nn
import torchvision.transforms as transforms
from PIL import Image
from networks.resnet import resnet50
import io

def load_model(model_path='weights/blur_jpg_prob0.5.pth', use_cpu=False):
    """
    載入預訓練模型。

    :param model_path: 模型檔案的路徑
    :param use_cpu: 是否使用 CPU（預設為 False，使用 GPU）
    :return: 已載入的模型
    """
    model = resnet50(num_classes=1)
    state_dict = torch.load(model_path, map_location='cpu')
    model.load_state_dict(state_dict['model'])
    if not use_cpu:
        model.cuda()
    model.eval()
    return model

def preprocess_image(image_data, crop=None):
    """
    對圖像進行預處理。

    :param image_data: 圖像的字節資料
    :param crop: 裁剪大小（若為 None，則不裁剪）
    :return: 預處理後的圖像張量
    """
    # Transform
    trans_init = []
    if crop is not None:
        trans_init = [transforms.CenterCrop(crop),]
        print('Cropping to [%i]' % crop)
    else:
        print('Not cropping')
    trans = transforms.Compose(trans_init + [
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225]),
    ])
    img = trans(Image.open(io.BytesIO(image_data)).convert('RGB'))
    return img

def predict_synthetic(image_data, model, crop=None, use_cpu=False):
    """
    預測圖像是否為合成（AI 生成）。

    :param image_data: 圖像的字節資料
    :param model: 已載入的模型
    :param crop: 裁剪大小（若為 None，則不裁剪）
    :param use_cpu: 是否使用 CPU（預設為 False，使用 GPU）
    :return: 圖像為合成的概率（0 到 1 之間）
    """
    img = preprocess_image(image_data, crop)
    with torch.no_grad():
        in_tens = img.unsqueeze(0)
        if not use_cpu:
            in_tens = in_tens.cuda()
        prob = model(in_tens).sigmoid().item()
    return prob

# 以下是測試代碼，可以在需要時使用
if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('-f','--file', default='examples_realfakedir')
    parser.add_argument('-m','--model_path', type=str, default='weights/blur_jpg_prob0.5.pth')
    parser.add_argument('-c','--crop', type=int, default=None, help='by default, do not crop. specify crop size')
    parser.add_argument('--use_cpu', action='store_true', help='uses gpu by default, turn on to use cpu')

    opt = parser.parse_args()

    # 載入模型
    model = load_model(opt.model_path, use_cpu=opt.use_cpu)

    # 讀取圖像檔案
    with open(opt.file, 'rb') as f:
        image_data = f.read()

    # 預測
    prob = predict_synthetic(image_data, model, crop=opt.crop, use_cpu=opt.use_cpu)
    print('Probability of being synthetic: {:.2f}%'.format(prob * 100))
