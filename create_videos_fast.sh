#!/bin/bash
# Fast video creation without heavy zoom effects

SCENES_DIR="/app/smartcontentlab-site/images/video_scenes"
OUTPUT_DIR="/app/smartcontentlab-site/videos"

mkdir -p "$OUTPUT_DIR"

echo "Creating videos with simple transitions..."

# Video 1: Product Demo
echo "📱 Video 1: Product Demo..."
ffmpeg -y -loop 1 -t 3 -i "$SCENES_DIR/v1_scene1_product_hero.png" \
   -loop 1 -t 3 -i "$SCENES_DIR/v1_scene2_phone_charging.png" \
   -loop 1 -t 3 -i "$SCENES_DIR/v1_scene3_all_devices.png" \
   -loop 1 -t 3 -i "$SCENES_DIR/v1_scene4_product_angle.png" \
   -filter_complex \
   "[0:v]scale=1280:720,fade=t=out:st=2.5:d=0.5[v0]; \
    [1:v]scale=1280:720,fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5[v1]; \
    [2:v]scale=1280:720,fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5[v2]; \
    [3:v]scale=1280:720,fade=t=in:st=0:d=0.5[v3]; \
    [v0][v1][v2][v3]concat=n=4:v=1:a=0[outv]" \
   -map "[outv]" -c:v libx264 -preset fast -pix_fmt yuv420p -r 30 \
   "$OUTPUT_DIR/product-demo-charger.mp4" -loglevel error

# Video 2: Smart LED Transformation  
echo "💡 Video 2: Smart LED Transformation..."
ffmpeg -y -loop 1 -t 4 -i "$SCENES_DIR/v2_scene1_before.png" \
   -loop 1 -t 4 -i "$SCENES_DIR/v2_scene2_after.png" \
   -loop 1 -t 4 -i "$SCENES_DIR/v2_scene3_app_control.png" \
   -loop 1 -t 4 -i "$SCENES_DIR/v2_scene4_lifestyle.png" \
   -loop 1 -t 4 -i "$SCENES_DIR/v2_scene5_comparison.png" \
   -filter_complex \
   "[0:v]scale=1280:720,fade=t=out:st=3.5:d=0.5[v0]; \
    [1:v]scale=1280:720,fade=t=in:st=0:d=0.5,fade=t=out:st=3.5:d=0.5[v1]; \
    [2:v]scale=1280:720,fade=t=in:st=0:d=0.5,fade=t=out:st=3.5:d=0.5[v2]; \
    [3:v]scale=1280:720,fade=t=in:st=0:d=0.5,fade=t=out:st=3.5:d=0.5[v3]; \
    [4:v]scale=1280:720,fade=t=in:st=0:d=0.5[v4]; \
    [v0][v1][v2][v3][v4]concat=n=5:v=1:a=0[outv]" \
   -map "[outv]" -c:v libx264 -preset fast -pix_fmt yuv420p -r 30 \
   "$OUTPUT_DIR/smart-led-transformation.mp4" -loglevel error

# Video 3: Tech Accessory
echo "🎧 Video 3: Tech Accessory Lifestyle..."
ffmpeg -y -loop 1 -t 4 -i "$SCENES_DIR/v3_scene1_product_hero.png" \
   -loop 1 -t 4 -i "$SCENES_DIR/v3_scene2_cafe_work.png" \
   -loop 1 -t 4 -i "$SCENES_DIR/v3_scene3_commute.png" \
   -loop 1 -t 4 -i "$SCENES_DIR/v3_scene4_flatlay.png" \
   -filter_complex \
   "[0:v]scale=1280:720,fade=t=out:st=3.5:d=0.5[v0]; \
    [1:v]scale=1280:720,fade=t=in:st=0:d=0.5,fade=t=out:st=3.5:d=0.5[v1]; \
    [2:v]scale=1280:720,fade=t=in:st=0:d=0.5,fade=t=out:st=3.5:d=0.5[v2]; \
    [3:v]scale=1280:720,fade=t=in:st=0:d=0.5[v3]; \
    [v0][v1][v2][v3]concat=n=4:v=1:a=0[outv]" \
   -map "[outv]" -c:v libx264 -preset fast -pix_fmt yuv420p -r 30 \
   "$OUTPUT_DIR/tech-accessory-lifestyle.mp4" -loglevel error

# Video 4: High-Energy Social Ad
echo "⚡ Video 4: High-Energy Social Ad..."
ffmpeg -y -loop 1 -t 3 -i "$SCENES_DIR/v4_scene1_problem.png" \
   -loop 1 -t 3 -i "$SCENES_DIR/v4_scene2_solution.png" \
   -loop 1 -t 3 -i "$SCENES_DIR/v4_scene3_services.png" \
   -loop 1 -t 3 -i "$SCENES_DIR/v4_scene4_cta.png" \
   -filter_complex \
   "[0:v]scale=1280:720,fade=t=out:st=2.5:d=0.5[v0]; \
    [1:v]scale=1280:720,fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5[v1]; \
    [2:v]scale=1280:720,fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5[v2]; \
    [3:v]scale=1280:720,fade=t=in:st=0:d=0.5[v3]; \
    [v0][v1][v2][v3]concat=n=4:v=1:a=0[outv]" \
   -map "[outv]" -c:v libx264 -preset fast -pix_fmt yuv420p -r 30 \
   "$OUTPUT_DIR/high-energy-social-ad.mp4" -loglevel error

# Video 5: Creative Workflow
echo "⚙️ Video 5: Creative Workflow..."
ffmpeg -y -loop 1 -t 3 -i "$SCENES_DIR/v5_scene1_ideation.png" \
   -loop 1 -t 3 -i "$SCENES_DIR/v5_scene2_design.png" \
   -loop 1 -t 3 -i "$SCENES_DIR/v5_scene3_editing.png" \
   -loop 1 -t 3 -i "$SCENES_DIR/v5_scene4_delivery.png" \
   -filter_complex \
   "[0:v]scale=1280:720,fade=t=out:st=2.5:d=0.5[v0]; \
    [1:v]scale=1280:720,fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5[v1]; \
    [2:v]scale=1280:720,fade=t=in:st=0:d=0.5,fade=t=out:st=2.5:d=0.5[v2]; \
    [3:v]scale=1280:720,fade=t=in:st=0:d=0.5[v3]; \
    [v0][v1][v2][v3]concat=n=4:v=1:a=0[outv]" \
   -map "[outv]" -c:v libx264 -preset fast -pix_fmt yuv420p -r 30 \
   "$OUTPUT_DIR/creative-workflow.mp4" -loglevel error

echo ""
echo "✅ All videos created!"
ls -lh "$OUTPUT_DIR"/*.mp4
