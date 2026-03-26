"""
Video Generation Script for SmartContent Lab AI
Generates 5 promotional videos using Sora 2 AI
"""
import sys
import os
import traceback
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath(''))

from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

# Load environment variables
load_dotenv()

def generate_video(prompt, output_path, model="sora-2", size="1280x720", duration=12):
    """Generate video with Sora 2"""
    print(f"\n{'='*80}")
    print(f"Generating: {output_path}")
    print(f"Duration: {duration}s | Size: {size} | Model: {model}")
    print(f"{'='*80}\n")
    print(f"Prompt: {prompt[:200]}...")
    print(f"\nGenerating video... This may take 5-10 minutes...")
    
    try:
        # Create new instance for each video
        video_gen = OpenAIVideoGeneration(api_key=os.environ['EMERGENT_LLM_KEY'])
        
        video_bytes = video_gen.text_to_video(
            prompt=prompt,
            model=model,
            size=size,
            duration=duration,
            max_wait_time=900  # 15 minutes timeout
        )
        
        if video_bytes:
            video_gen.save_video(video_bytes, output_path)
            print(f"✅ SUCCESS: Video saved to {output_path}")
            return True
        else:
            print(f"❌ FAILED: No video bytes returned")
            return False
            
    except Exception as e:
        print(f"❌ ERROR generating video: {str(e)}")
        traceback.print_exc()
        return False

def main():
    """Generate all 5 marketing videos"""
    
    output_dir = "/app/smartcontentlab-site/videos"
    os.makedirs(output_dir, exist_ok=True)
    
    # Video 1: Product Demo - 3-in-1 Wireless Charger (15-20 seconds)
    video_1_prompt = """
    A sleek, cinematic product demo video of a premium 3-in-1 wireless charger on a minimalist modern desk.
    
    Scene 1 (0-3s): Close-up slow-motion shot with soft futuristic blue lighting highlighting the elegant black charging pad with subtle LED indicators.
    
    Scene 2 (3-6s): A hand elegantly places a smartphone onto the charging pad. A gentle blue glow pulses, indicating charging has started.
    
    Scene 3 (6-9s): Smooth camera pan showing a smartwatch being placed on the watch stand and wireless earbuds in their case placed on the third charging spot, all charging simultaneously with subtle LED glows.
    
    Scene 4 (9-12s): Overhead shot revealing all three devices charging on the clean, organized desk setup with perfect symmetry.
    
    Scene 5 (12-15s): Dynamic quick cuts showcasing the product from different angles - side view, 45-degree angle, close-up of materials and LED indicators - highlighting premium design and build quality.
    
    Style: Ultra-modern, clean aesthetic with professional product photography lighting. Smooth camera movements. Depth of field with soft bokeh. Cool blue and white color palette. Apple-style premium tech commercial feel.
    """
    
    # Video 2: Smart LED Home Transformation (20-25 seconds)
    video_2_prompt = """
    A dramatic before-and-after transformation video of a living room using smart LED lighting.
    
    Scene 1 (0-5s): A dimly lit, ordinary living room with flat warm overhead lighting. The space looks uninspired and lacks character. Static camera showing the mundane atmosphere.
    
    Scene 2 (5-10s): Dramatic transition - a hand reaches for a smart home app on a phone screen. Instant transformation as vibrant smart LED lighting activates. The same room suddenly comes alive with dynamic RGB lighting - accent lights behind the TV, under-cabinet glows, LED strips along the ceiling creating colorful ambiance. The room shifts from warm to cool energetic blue and purple tones.
    
    Scene 3 (10-15s): Close-ups of different lighting effects - colorful accent lighting highlighting artwork on walls, smooth color transitions from blue to purple to pink, cove lighting creating depth. A person uses their phone to change colors and brightness with satisfying UI interactions.
    
    Scene 4 (15-20s): People enjoying the transformed space - someone reading comfortably in a cozy warm light zone, friends entertaining with dynamic party lighting, someone relaxing with calming ambient colors. Show the emotional connection to the space.
    
    Scene 5 (20-25s): Final hero shot - split screen showing before (dull) and after (illuminated and vibrant) with the smart LED system creating a stunning modern living environment.
    
    Style: Cinematic home transformation video. Dramatic lighting contrasts. Warm vs cool color psychology. Professional real estate video quality. Emotional storytelling through lighting.
    """
    
    # Video 3: Tech Accessory Lifestyle Ad (15-20 seconds)
    video_3_prompt = """
    A modern, aspirational lifestyle ad showcasing premium tech accessories seamlessly integrated into a stylish daily routine.
    
    Scene 1 (0-3s): Extreme close-up product shot - a premium minimalist wireless earbuds case with brushed metal finish resting on dark textured concrete. Sophisticated studio lighting with dramatic shadows emphasizing form and material quality.
    
    Scene 2 (3-6s): Fast-paced lifestyle montage - young professional intensely focused on laptop in a sun-drenched modern cafe with the earbuds case visible. Cut to: person commuting on sleek public transport listening to music with premium wireless earbuds. Cut to: someone jogging in an urban park at golden hour, earbuds seamlessly integrated into their active lifestyle.
    
    Scene 3 (6-9s): Intimate close-up on a person's face showing quiet satisfaction and focus while using the tech. Shallow depth of field. The accessory partially visible in soft focus, connecting emotion to product.
    
    Scene 4 (9-12s): Artistic product shots - the accessory caught in slight motion blur as it's elegantly picked up. Extreme close-up on premium materials - brushed aluminum texture, LED charging indicator softly glowing, subtle branding details.
    
    Scene 5 (12-15s): Quick visual storytelling montage - accessory paired with designer bag and smartwatch in a stylish flat lay. Wireless charging with satisfying minimal design. Product neatly packed in premium travel case ready for adventure.
    
    Style: High-end Apple/Samsung commercial aesthetic. Cinematic color grading with teal and orange tones. Sophisticated lighting. Fast-paced editing. Aspirational lifestyle branding. Premium tech meets modern design.
    """
    
    # Video 4: High-Energy Paid Social Ad (10-15 seconds)
    video_4_prompt = """
    An attention-grabbing, high-energy social media ad with fast cuts and dynamic visuals.
    
    Scene 1 (0-2s): Rapid-fire montage of business frustrations - blank uninspired website template glitching. Smartphone showing zero notifications. Stressed business owner looking overwhelmed and confused at their computer. Quick jarring cuts. Desaturated muted colors. Ticking clock sound effect visual. Creates urgency and relatable problem.
    
    Scene 2 (2-5s): EXPLOSIVE bright flash transition! Sudden mood shift. A modern, vibrant, professional website design materializes on screen with smooth animations. Colorful social media notification icons (likes, hearts, comments) rapidly pop up and burst with playful motion graphics. Same business owner now smiling confidently looking at their phone with relief and excitement. Bright saturated colors. High energy.
    
    Scene 3 (5-8s): Fast dynamic cuts showcasing services - sleek professional website hero section with bold typography. Captivating premium brand logo animation. Short punchy promotional video clip with motion graphics. Quick "whoosh" transitions between each service. Text overlay: "Websites. Branding. Content. FAST."
    
    Scene 4 (8-12s): Energetic SmartContent Lab AI logo animation - spinning, glowing, expanding with particle effects. Digital finger icon taps a prominent glowing "Get Started" button. Text: "Stop Scrolling. Start Growing."
    
    Scene 5 (12-15s): Clean final screen - SmartContent Lab AI logo prominently displayed. Bold call-to-action: "Visit SmartContentLabAI.com NOW!" with urgency. Modern sans-serif typography. Electric blue and bright orange accent colors.
    
    Style: TikTok/Instagram Reels energy. Fast-paced editing with 0.5-1 second cuts. High contrast colors. Motion graphics overlays. Trending social media ad style. Optimized for scroll-stopping attention on mobile feeds.
    """
    
    # Video 5: Our Creative Workflow (10-15 seconds) - NEW
    video_5_prompt = """
    A behind-the-scenes workflow demonstration showing the SmartContent Lab AI creative process from concept to delivery.
    
    Scene 1 (0-3s): Fast-paced montage opening - hands typing on keyboard with code and design software on multiple screens. Tablet showing website wireframes and sketches. Color palette swatches. Typography samples. Mood boards with design inspiration. Quick cuts showing the ideation phase. Modern creative studio environment.
    
    Scene 2 (3-6s): Design software in action - Adobe Illustrator artboard with logo design evolving in real-time. Figma prototype with website sections being assembled with smooth animations. Brand identity guidelines being created. Typography and color being applied. Fast-forward time-lapse effect showing rapid professional work.
    
    Scene 3 (6-9s): Video editing workflow - timeline in video editing software with multiple layers. Color grading panels with adjustments. Motion graphics being keyframed. Audio waveforms syncing. Transitions being applied. Preview window showing polished output. Professional post-production environment.
    
    Scene 4 (9-12s): Quality control and delivery - side-by-side comparisons of before/after designs. Responsive website mockups on phone, tablet, and desktop. Final exports being generated with progress bars. Files being organized in branded folders. Professional presentation ready for client.
    
    Scene 5 (12-15s): Final delivery moment - polished website going live, loading on a browser. Happy client reviewing the work on their device with satisfaction. SmartContent Lab AI branding subtly integrated. Text overlay: "From Script to Edit to Final Delivery" and "SmartContentLabAI.com"
    
    Style: Creative agency behind-the-scenes aesthetic. Fast-paced workflow montage. Professional studio lighting. Screen recordings with modern UI. Smooth transitions. Tech startup energy. Inspiring and showcasing expertise and process.
    """
    
    videos = [
        {
            "prompt": video_1_prompt,
            "output": f"{output_dir}/product-demo-charger.mp4",
            "duration": 12,
            "name": "Product Demo: 3-in-1 Wireless Charger"
        },
        {
            "prompt": video_2_prompt,
            "output": f"{output_dir}/smart-led-transformation.mp4",
            "duration": 12,
            "name": "Smart LED Home Transformation"
        },
        {
            "prompt": video_3_prompt,
            "output": f"{output_dir}/tech-accessory-lifestyle.mp4",
            "duration": 12,
            "name": "Tech Accessory Lifestyle Ad"
        },
        {
            "prompt": video_4_prompt,
            "output": f"{output_dir}/high-energy-social-ad.mp4",
            "duration": 12,
            "name": "High-Energy Paid Social Ad"
        },
        {
            "prompt": video_5_prompt,
            "output": f"{output_dir}/creative-workflow.mp4",
            "duration": 12,
            "name": "Our Creative Workflow"
        }
    ]
    
    print("\n" + "="*80)
    print("SMARTCONTENT LAB AI - VIDEO GENERATION")
    print("="*80)
    print(f"Total Videos to Generate: {len(videos)}")
    print(f"Output Directory: {output_dir}")
    print(f"Model: sora-2")
    print(f"Estimated Total Time: 25-50 minutes")
    print("="*80 + "\n")
    
    results = []
    for i, video in enumerate(videos, 1):
        print(f"\n{'#'*80}")
        print(f"VIDEO {i}/{len(videos)}: {video['name']}")
        print(f"{'#'*80}")
        
        success = generate_video(
            prompt=video['prompt'],
            output_path=video['output'],
            duration=video['duration'],
            size="1280x720",
            model="sora-2"
        )
        
        results.append({
            "name": video['name'],
            "output": video['output'],
            "success": success
        })
        
        if success:
            # Check file size
            if os.path.exists(video['output']):
                size_mb = os.path.getsize(video['output']) / (1024 * 1024)
                print(f"📊 File size: {size_mb:.2f} MB")
        
        print(f"\n{'='*80}\n")
    
    # Final summary
    print("\n" + "="*80)
    print("GENERATION COMPLETE - SUMMARY")
    print("="*80)
    
    successful = sum(1 for r in results if r['success'])
    failed = len(results) - successful
    
    print(f"\n✅ Successful: {successful}/{len(results)}")
    print(f"❌ Failed: {failed}/{len(results)}\n")
    
    for i, result in enumerate(results, 1):
        status = "✅" if result['success'] else "❌"
        print(f"{status} Video {i}: {result['name']}")
        if result['success']:
            print(f"   📁 {result['output']}")
    
    print("\n" + "="*80 + "\n")
    
    if successful == len(results):
        print("🎉 All videos generated successfully!")
        print("📂 Videos saved to: /app/smartcontentlab-site/videos/")
        print("\nNext steps:")
        print("1. Update website HTML to reference these video files")
        print("2. Test videos in the website")
        print("3. Commit and push to GitHub")
        print("4. Deploy to Netlify")
    else:
        print(f"⚠️  {failed} video(s) failed to generate. Check errors above.")
    
    return successful == len(results)

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
