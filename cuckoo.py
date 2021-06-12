import os
import time
import sqlite3
os.environ["PYGAME_HIDE_SUPPORT_PROMPT"] = "hide" # suppress annoying prompt
import pygame
import sys


def getSongs(conn, dayOfWeek, date, time):
    cursor = conn.cursor()
    query =  "SELECT songFile from playlist WHERE "
    query += "time = {0} AND ("
    query += "recurrence = 1 OR "
    query += "dayOfWeek = {1} OR "
    query += "date = '{2}')"
    query += "ORDER BY recurrence DESC, id DESC"
    query = query.format(time, dayOfWeek, date)
    cursor.execute(query)
    return cursor.fetchone()

def playSong(songFile):
    try:
        pygame.mixer.init()
        pygame.mixer.music.load("Music/" + songFile)
        pygame.mixer.music.play()
        while pygame.mixer.music.get_busy() == True:
            continue
    except:
        print("Error playing song: ", sys.exc_info()[1])

os.chdir("/home/pi/Cuckoo")
conn = sqlite3.connect("cuckoo.db")
now = time.localtime()
dayOfWeek = now.tm_wday
date = "{0}-{1:02d}-{2:02d}".format(now.tm_year, now.tm_mon, now.tm_mday)
time = "{0:02d}{1:02d}".format(now.tm_hour, now.tm_min)
time = "2214"
songsToPlay = getSongs(conn, dayOfWeek, date, time)
if (songsToPlay):
    print("Playing " + songsToPlay[0])
    playSong(songsToPlay[0])
conn.close()
