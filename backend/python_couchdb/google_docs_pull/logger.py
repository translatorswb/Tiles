import datetime

def log(msg):
    timestamp = datetime.datetime.now().strftime("[%d-%m-%Y %H:%M:%S]")
    print(F"{timestamp} {msg}\n")