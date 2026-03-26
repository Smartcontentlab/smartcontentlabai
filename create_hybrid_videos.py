"""
Hybrid Video Creation Script for SmartContent Lab AI
Generates professional marketing videos using AI-generated images + video effects
"""
import asyncio
import sys
import os
import base64
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath(''))

from emergentintegrations.llm.openai.image_generation import OpenAIImageGeneration

# Load environment variables
load_dotenv()

async def generate_image(prompt, output_path, image_gen):
    """Generate a single image using OpenAI"""
    print(f"  🎨 Generating: {os.path.basename(output_path)}")
    print(f"     Prompt: {prompt[:100]}...")
    
    try:
        images = await image_gen.generate_images(
            prompt=prompt,
            model="gpt-image-1",
            number_of_images=1
        )
        
        if images and len(images) > 0:
            with open(output_path, "wb") as f:
                f.write(images[0])
            print(f"  ✅ Saved: {output_path}")
            return True
        else:
            print(f"  ❌ Failed: No image generated")
            return False
            
    except Exception as e:
        print(f"  ❌ Error: {str(e)}")
        return False

async def generate_all_images():
    """Generate all images for the 5 videos"""
    
    output_dir = "/app/smartcontentlab-site/images/video_scenes"
    os.makedirs(output_dir, exist_ok=True)
    
    # Initialize image generator
    image_gen = OpenAIImageGeneration(api_key=os.environ['EMERGENT_LLM_KEY'])
    
    print("\n" + "="*80)
    print("GENERATING AI IMAGES FOR VIDEO SCENES")
    print("="*80 + "\n")
    
    # VIDEO 1: Product Demo - 3-in-1 Wireless Charger
    print("\n📱 VIDEO 1: Product Demo - 3-in-1 Wireless Charger")
    print("-" * 80)
    
    video1_scenes = [
        {
            "prompt": "Professional product photography of a sleek black 3-in-1 wireless charging pad on a minimalist white desk. Soft blue LED glow from the charging pad. Clean modern aesthetic, dramatic studio lighting with soft shadows, ultra-sharp focus, premium tech product shot, 4K quality",
            "file": f"{output_dir}/v1_scene1_product_hero.png"
        },
        {
            "prompt": "Close-up cinematic shot of a hand placing an iPhone onto a modern wireless charging pad. Elegant blue LED indicator glowing softly. Shallow depth of field, professional product photography, clean minimalist background, premium lighting",
            "file": f"{output_dir}/v1_scene2_phone_charging.png"
        },
        {
            "prompt": "Overhead flat lay product shot showing iPhone, Apple Watch, and AirPods all charging simultaneously on a premium 3-in-1 wireless charger. All three devices have subtle blue charging indicators. Perfect symmetry, organized desk setup, minimalist modern aesthetic, professional photography",
            "file": f"{output_dir}/v1_scene3_all_devices.png"
        },
        {
            "prompt": "Dynamic 45-degree angle product shot of a premium black 3-in-1 wireless charger with LED indicators. Dramatic studio lighting, soft blue accent lights, bokeh background, ultra-sharp focus on product details, Apple-style tech commercial aesthetic",
            "file": f"{output_dir}/v1_scene4_product_angle.png"
        }
    ]
    
    # VIDEO 2: Smart LED Home Transformation
    print("\n💡 VIDEO 2: Smart LED Home Transformation")
    print("-" * 80)
    
    video2_scenes = [
        {
            "prompt": "A dimly lit, ordinary living room with boring flat overhead lighting. Beige walls, standard furniture, uninspired atmosphere. Photorealistic interior photography, natural lighting, dull and lifeless mood",
            "file": f"{output_dir}/v2_scene1_before.png"
        },
        {
            "prompt": "The same living room dramatically transformed with vibrant smart LED lighting. Dynamic RGB accent lights behind TV creating purple and blue ambiance. LED strips along ceiling creating colorful glow. Modern smart home aesthetic, dramatic lighting transformation, energetic atmosphere, photorealistic interior",
            "file": f"{output_dir}/v2_scene2_after.png"
        },
        {
            "prompt": "Close-up of a hand holding a modern smartphone displaying a smart home lighting app with color wheel and brightness controls. LED light strips in background changing colors from blue to purple. Professional product photography, shallow depth of field",
            "file": f"{output_dir}/v2_scene3_app_control.png"
        },
        {
            "prompt": "Modern living room with smart LED accent lighting highlighting artwork on walls, under-cabinet RGB glow, and colorful cove lighting. People relaxing comfortably in the beautifully lit space. Warm and inviting smart home ambiance, photorealistic interior photography",
            "file": f"{output_dir}/v2_scene4_lifestyle.png"
        },
        {
            "prompt": "Split screen comparison showing living room before and after smart LED lighting. Left side: dull and boring with flat lighting. Right side: vibrant and modern with dynamic RGB smart lighting creating beautiful ambiance. Professional interior photography",
            "file": f"{output_dir}/v2_scene5_comparison.png"
        }
    ]
    
    # VIDEO 3: Tech Accessory Lifestyle Ad
    print("\n🎧 VIDEO 3: Tech Accessory Lifestyle Ad")
    print("-" * 80)
    
    video3_scenes = [
        {
            "prompt": "Extreme close-up product shot of premium wireless earbuds case with brushed aluminum finish resting on dark textured concrete surface. Sophisticated studio lighting with dramatic shadows emphasizing form. Ultra-sharp macro photography, Apple commercial style",
            "file": f"{output_dir}/v3_scene1_product_hero.png"
        },
        {
            "prompt": "Young stylish professional intensely focused working on MacBook laptop in a sun-drenched modern cafe with large windows. Premium wireless earbuds visible on table. Golden hour lighting, shallow depth of field, aspirational lifestyle photography, cinematic color grading",
            "file": f"{output_dir}/v3_scene2_cafe_work.png"
        },
        {
            "prompt": "Person commuting on modern sleek subway train, wearing premium wireless earbuds, looking content while listening to music. Urban lifestyle, professional photography, natural lighting through train windows, aspirational tech lifestyle",
            "file": f"{output_dir}/v3_scene3_commute.png"
        },
        {
            "prompt": "Flat lay product photography featuring premium wireless earbuds case alongside designer leather bag, Apple Watch, and minimal workspace setup. Perfect symmetry, organized luxury tech accessories, sophisticated lifestyle branding, professional product photography",
            "file": f"{output_dir}/v3_scene4_flatlay.png"
        }
    ]
    
    # VIDEO 4: High-Energy Paid Social Ad
    print("\n⚡ VIDEO 4: High-Energy Paid Social Ad")
    print("-" * 80)
    
    video4_scenes = [
        {
            "prompt": "Stressed frustrated business owner looking at blank uninspired website template on computer screen showing zero engagement. Overwhelmed expression, cluttered desk, desaturated muted colors, problem-focused photography",
            "file": f"{output_dir}/v4_scene1_problem.png"
        },
        {
            "prompt": "Happy confident business owner smiling while looking at their phone displaying a vibrant modern professional website with social media notifications popping up. Bright saturated colors, excited expression, problem solved, energetic atmosphere",
            "file": f"{output_dir}/v4_scene2_solution.png"
        },
        {
            "prompt": "Modern sleek professional website design mockup on laptop screen with bold typography, vibrant colors, and clean layout. Colorful social media notification icons (likes, hearts, comments) floating around. High-energy digital marketing visual, bright and dynamic",
            "file": f"{output_dir}/v4_scene3_services.png"
        },
        {
            "prompt": "Bold modern call-to-action screen showing 'SmartContent Lab AI' logo with glowing effects and prominent 'Get Started' button. Electric blue and bright orange accent colors. Clean professional branding, high contrast, optimized for social media ads",
            "file": f"{output_dir}/v4_scene4_cta.png"
        }
    ]
    
    # VIDEO 5: Our Creative Workflow
    print("\n⚙️ VIDEO 5: Our Creative Workflow")
    print("-" * 80)
    
    video5_scenes = [
        {
            "prompt": "Professional creative workspace with multiple monitors showing design software - Figma wireframes, Adobe Illustrator artboards, color palettes, and typography samples. Hands typing on keyboard, modern studio environment, creative agency aesthetic",
            "file": f"{output_dir}/v5_scene1_ideation.png"
        },
        {
            "prompt": "Computer screen showing design software with logo being created and website prototype in Figma. Multiple design layers visible, brand identity guidelines being assembled. Professional digital design workflow, modern UI/UX design process",
            "file": f"{output_dir}/v5_scene2_design.png"
        },
        {
            "prompt": "Video editing software interface showing timeline with multiple layers, color grading panels, and motion graphics being keyframed. Professional post-production workspace, creative video editing environment",
            "file": f"{output_dir}/v5_scene3_editing.png"
        },
        {
            "prompt": "Polished professional website displayed on laptop, tablet, and smartphone showing responsive design. Happy client reviewing the final deliverables with satisfaction. Clean modern website design, successful project completion, professional agency delivery",
            "file": f"{output_dir}/v5_scene4_delivery.png"
        }
    ]
    
    # Combine all scenes
    all_scenes = [
        ("Video 1", video1_scenes),
        ("Video 2", video2_scenes),
        ("Video 3", video3_scenes),
        ("Video 4", video4_scenes),
        ("Video 5", video5_scenes)
    ]
    
    total_images = sum(len(scenes) for _, scenes in all_scenes)
    generated = 0
    failed = 0
    
    print(f"\n📊 Total images to generate: {total_images}")
    print("⏱️  Estimated time: 10-20 minutes\n")
    
    for video_name, scenes in all_scenes:
        print(f"\n{'='*80}")
        print(f"{video_name}")
        print('='*80)
        
        for scene in scenes:
            success = await generate_image(scene['prompt'], scene['file'], image_gen)
            if success:
                generated += 1
            else:
                failed += 1
            
            # Small delay between requests
            await asyncio.sleep(2)
    
    print("\n" + "="*80)
    print("IMAGE GENERATION COMPLETE")
    print("="*80)
    print(f"✅ Successfully generated: {generated}/{total_images}")
    print(f"❌ Failed: {failed}/{total_images}")
    print(f"📁 Images saved to: {output_dir}/")
    print("="*80 + "\n")
    
    return generated, total_images, output_dir

def create_video_from_images(video_name, image_files, output_path, duration_per_image=3, text_overlays=None):
    """Create video from images using FFmpeg with Ken Burns effect and transitions"""
    
    print(f"\n🎬 Creating video: {video_name}")
    print(f"   Images: {len(image_files)}")
    print(f"   Output: {output_path}")
    
    # Create a temporary file list for FFmpeg
    filelist_path = "/tmp/filelist.txt"
    
    # Build FFmpeg command with crossfade transitions and zoom effects
    # This creates a professional video with smooth transitions
    
    total_duration = len(image_files) * duration_per_image
    
    # Simple approach: concatenate images with crossfade
    filter_complex = ""
    
    for i, img in enumerate(image_files):
        if not os.path.exists(img):
            print(f"   ⚠️  Warning: Image not found: {img}")
            return False
    
    # Create video using FFmpeg with zoom and pan effects (Ken Burns)
    inputs = " ".join([f"-loop 1 -t {duration_per_image} -i {img}" for img in image_files])
    
    # Build filter for smooth transitions
    filter_parts = []
    for i in range(len(image_files)):
        # Scale and add zoom effect
        filter_parts.append(f"[{i}:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.0015,1.5)':d={duration_per_image*30}:s=1280x720[v{i}]")
    
    # Add crossfade transitions
    if len(image_files) > 1:
        transition = f"[v0][v1]xfade=transition=fade:duration=0.5:offset={duration_per_image-0.5}[vt0]"
        filter_parts.append(transition)
        
        for i in range(1, len(image_files)-1):
            offset = (duration_per_image * (i+1)) - (0.5 * (i+1))
            transition = f"[vt{i-1}][v{i+1}]xfade=transition=fade:duration=0.5:offset={offset}[vt{i}]"
            filter_parts.append(transition)
        
        final_output = f"vt{len(image_files)-2}"
    else:
        final_output = "v0"
    
    filter_complex = ";".join(filter_parts)
    
    cmd = f'ffmpeg -y {inputs} -filter_complex "{filter_complex}" -map "[{final_output}]" -c:v libx264 -pix_fmt yuv420p -r 30 {output_path}'
    
    print(f"   🔨 Running FFmpeg...")
    result = os.system(cmd + " 2>&1 | tail -5")
    
    if result == 0 and os.path.exists(output_path):
        size_mb = os.path.getsize(output_path) / (1024 * 1024)
        print(f"   ✅ Video created successfully! Size: {size_mb:.2f} MB")
        return True
    else:
        print(f"   ❌ Failed to create video")
        return False

def create_all_videos(images_dir):
    """Create all 5 videos from generated images"""
    
    print("\n" + "="*80)
    print("CREATING VIDEOS FROM IMAGES")
    print("="*80 + "\n")
    
    videos_dir = "/app/smartcontentlab-site/videos"
    os.makedirs(videos_dir, exist_ok=True)
    
    videos = [
        {
            "name": "Product Demo: 3-in-1 Wireless Charger",
            "images": [
                f"{images_dir}/v1_scene1_product_hero.png",
                f"{images_dir}/v1_scene2_phone_charging.png",
                f"{images_dir}/v1_scene3_all_devices.png",
                f"{images_dir}/v1_scene4_product_angle.png"
            ],
            "output": f"{videos_dir}/product-demo-charger.mp4",
            "duration": 4
        },
        {
            "name": "Smart LED Home Transformation",
            "images": [
                f"{images_dir}/v2_scene1_before.png",
                f"{images_dir}/v2_scene2_after.png",
                f"{images_dir}/v2_scene3_app_control.png",
                f"{images_dir}/v2_scene4_lifestyle.png",
                f"{images_dir}/v2_scene5_comparison.png"
            ],
            "output": f"{videos_dir}/smart-led-transformation.mp4",
            "duration": 4
        },
        {
            "name": "Tech Accessory Lifestyle Ad",
            "images": [
                f"{images_dir}/v3_scene1_product_hero.png",
                f"{images_dir}/v3_scene2_cafe_work.png",
                f"{images_dir}/v3_scene3_commute.png",
                f"{images_dir}/v3_scene4_flatlay.png"
            ],
            "output": f"{videos_dir}/tech-accessory-lifestyle.mp4",
            "duration": 4
        },
        {
            "name": "High-Energy Paid Social Ad",
            "images": [
                f"{images_dir}/v4_scene1_problem.png",
                f"{images_dir}/v4_scene2_solution.png",
                f"{images_dir}/v4_scene3_services.png",
                f"{images_dir}/v4_scene4_cta.png"
            ],
            "output": f"{videos_dir}/high-energy-social-ad.mp4",
            "duration": 3
        },
        {
            "name": "Our Creative Workflow",
            "images": [
                f"{images_dir}/v5_scene1_ideation.png",
                f"{images_dir}/v5_scene2_design.png",
                f"{images_dir}/v5_scene3_editing.png",
                f"{images_dir}/v5_scene4_delivery.png"
            ],
            "output": f"{videos_dir}/creative-workflow.mp4",
            "duration": 3
        }
    ]
    
    successful = 0
    failed = 0
    
    for video in videos:
        success = create_video_from_images(
            video['name'],
            video['images'],
            video['output'],
            video['duration']
        )
        
        if success:
            successful += 1
        else:
            failed += 1
    
    print("\n" + "="*80)
    print("VIDEO CREATION COMPLETE")
    print("="*80)
    print(f"✅ Successfully created: {successful}/{len(videos)}")
    print(f"❌ Failed: {failed}/{len(videos)}")
    print(f"📁 Videos saved to: {videos_dir}/")
    
    if successful > 0:
        print("\n📋 Next steps:")
        print("   1. Videos are ready in /app/smartcontentlab-site/videos/")
        print("   2. Update website HTML to reference these videos")
        print("   3. Test videos in the website")
        print("   4. Commit and push to GitHub")
    
    print("="*80 + "\n")
    
    return successful == len(videos)

async def main():
    """Main execution function"""
    
    print("\n" + "🎥" * 40)
    print("SMARTCONTENT LAB AI - HYBRID VIDEO CREATION")
    print("AI Images + Professional Video Effects")
    print("🎥" * 40 + "\n")
    
    # Step 1: Generate all images
    try:
        generated, total, images_dir = await generate_all_images()
        
        if generated == 0:
            print("❌ No images were generated. Cannot create videos.")
            return False
        
        if generated < total:
            print(f"⚠️  Warning: Only {generated}/{total} images generated. Videos may be incomplete.")
        
    except Exception as e:
        print(f"❌ Error generating images: {str(e)}")
        import traceback
        traceback.print_exc()
        return False
    
    # Step 2: Create videos from images
    try:
        success = create_all_videos(images_dir)
        return success
    except Exception as e:
        print(f"❌ Error creating videos: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    success = asyncio.run(main())
    sys.exit(0 if success else 1)
