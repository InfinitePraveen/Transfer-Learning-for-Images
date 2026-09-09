import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    UPLOAD_FOLDER = os.path.join('static', 'uploads')
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    
    # Dataset configuration
    DATA_DIR = os.path.join('data', 'flowers')
    NUM_CLASSES = 102
    
    # Model paths
    MODEL_PATHS = {
        'vgg16': os.path.join('models', 'vgg16_flowers102.pth'),
        'resnet50': os.path.join('models', 'resnet50_flowers102.pth')
    }
    
    # Class names - all 102 Oxford flowers  
    CLASS_NAMES = [
        'pink primrose', 'hard-leaved pocket orchid', 'canterbury bells', 'sweet pea', 'english marigold',
        'tiger lily', 'moon orchid', 'bird of paradise', 'monkshood', 'globe thistle',
        'lenten rose', 'barbeton daisy', 'daffodil', 'sword lily', 'poinsettia',
        'primula', 'prince of wales feathers', 'purple coneflower', 'purple loosestrife', 'purple daisy',
        'quaker ladies', 'quill-leaved maplewood', 'quince', 'rabbit\'s ears', 'ragged robin',
        'ragged petal', 'rain lily', 'ramblers rambling', 'ramie flower', 'ranunculus',
        'red hot poker', 'red leafed rose', 'red poppy', 'red thistle', 'reddish flower',
        'regal lily', 'regelia tulip', 'reticulated iris', 'rhododendron', 'rhoeo discolor',
        'ribbon plant', 'rice flower', 'river beauty', 'roebuck\'s violet', 'roman hyacinth',
        'romneya coulteri', 'rose', 'rosa rugosa', 'rosy milkweed', 'round-leaved sundew',
        'rudbeckia', 'ruellia', 'russian sage', 'rustic flower', 'rusty foxglove',
        'saffron crocus', 'sage', 'sago palm', 'sahara myrtle', 'saint john\'s wort',
        'saint paulia', 'saintly flower', 'salvia', 'salvia greggii', 'salvia nemorosa',
        'sampler cross', 'sand phlox', 'sandersonia', 'sandpaper vine', 'sanguinaria',
        'savin', 'scarborough lily', 'scarlet pimpernel', 'scarlet sage', 'scentless mayweed',
        'schizostylis', 'scilla', 'scrophularia', 'scutellaria', 'sea aster',
        'sea holly', 'sea lavender', 'sea pea', 'sea pink', 'seal flower',
        'sealifornia poppy', 'seance flower', 'seaside daisy', 'second breath', 'secret garden',
        'security blanket', 'sedge', 'sedum', 'seed pod flower', 'self heal',
        'sempervivum', 'senecio', 'senna', 'sensitive fern', 'sentry palm'
    ]