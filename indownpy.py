import instaloader
import os
username = 'toda.ydeals'

L = instaloader.Instaloader()
L.login(username,'Bunny@99050')
# L.load_session_from_file(filename="")
# https://www.instagram.com/p/CQMF5agjP-W/
code = input('Enter sortcode: ')
post = instaloader.Post.from_shortcode(L.context,code)
L.download_post(post,"sortcode")

files = os.listdir('sortcode')
images = []
for fail in files:
    if(fail.endswith(".mp4")):
        vodeoPath = os.path.join('sortcode',fail)
        coverPath = os.path.join('sortcode',fail[:-3]+"jpg")
        coverDestPath = os.path.join('data\\video',fail[:-3]+"jpg")
        os.rename(vodeoPath,os.path.join('data\\video',fail))
        os.rename(coverPath,coverDestPath)

files = os.listdir('sortcode')
for fail in files:
    if(fail.endswith(".jpg")):
        imagePath = os.path.join('sortcode',fail)
        os.rename(imagePath,os.path.join('data/images',fail))
    else:
        os.remove(os.path.join('sortcode',fail))
os.rmdir('sortcode')




 # stories = L.get_stories([profile])
# print('i am after stories',str(stories))
# for story in stories:
#     print('i am in loop after stories')
#     for item in story.get_items():
#         print('trying to download')
#         L.download_storyitem(item,":stories")
