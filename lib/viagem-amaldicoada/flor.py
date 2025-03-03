from PIL import Image, ImageDraw
import math
import random
import colorsys

# Configurações da imagem
WIDTH, HEIGHT = 3840, 2160  # 4K resolution
ITERATIONS = 15
LAYERS = 36
COLOR_CYCLES = 3

def generate_fractal_mandala():
    # Cria imagem com fundo preto
    img = Image.new('RGB', (WIDTH, HEIGHT), 'black')
    draw = ImageDraw.Draw(img)

    # Gera paleta de cores psicodélicas
    palette = [colorsys.hsv_to_rgb(i/LAYERS, 1, 1) for i in range(LAYERS)]
    palette = [(int(r*255), int(g*255), int(b*255)) for r,g,b in palette]

    # Parâmetros dinâmicos
    center = (WIDTH//2, HEIGHT//2)
    max_radius = min(WIDTH, HEIGHT) * 0.45
    angle_step = 2*math.pi / LAYERS

    # Algoritmo de desenho fractal
    for layer in range(LAYERS):
        hue_shift = layer/LAYERS * COLOR_CYCLES
        radius = max_radius * (1 - layer/(LAYERS*1.2))

        for i in range(ITERATIONS):
            current_angle = angle_step * layer + i * 0.1
            growth_factor = math.sin(i * math.pi/ITERATIONS)

            # Fórmula de padrão hipercomplexo
            x = center[0] + radius * growth_factor * math.cos(current_angle)
            y = center[1] + radius * growth_factor * math.sin(current_angle)

            # Tamanho dinâmico com base na teoria do caos
            size = (max_radius * 0.02) * (1 + math.log(i+2))

            # Cor com gradiente quântico
            r, g, b = colorsys.hsv_to_rgb(
                (hue_shift + growth_factor) % 1,
                0.6 + 0.4*math.sin(current_angle),
                0.8 + 0.2*math.cos(layer))
            color = (int(r*255), int(g*255), int(b*255))

            # Desenha elementos geométricos
            draw.ellipse(
                [x-size, y-size, x+size, y+size],
                fill=color,
                width=int(size**0.5))

            # Adiciona padrões recursivos
            for j in range(3):
                sub_size = size * 0.6**j
                draw.rectangle(
                    [x-sub_size, y-sub_size, x+sub_size, y+sub_size],
                    outline=color,
                    width=int(sub_size**0.3))

    # Aplica efeito de bloom
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.2)

    return img

# Gera e salva a imagem
mandala = generate_fractal_mandala()
mandala.save('cosmic_mandala.png', 'PNG', quality=100, dpi=(300, 300))
mandala.show()