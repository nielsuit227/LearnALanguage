import logging
import os

# Create static if not exist
if not os.path.exists("static/app_logs.log"):
    if not os.path.exists("static"):
        os.mkdir("static/")
    with open("static/app_logs.log", "w") as f:
        f.write("")

# Logger
logger = logging.getLogger()
logger.setLevel("INFO")

# Files
handler = logging.FileHandler("static/app_logs.log", mode="a")
handler.setFormatter(
    logging.Formatter("%(asctime)s - %(levelname)s - %(message)s", "%d %b %y, %H:%M:%S")
)
logger.addHandler(handler)

# Console
console = logging.StreamHandler()
console.setFormatter(
    logging.Formatter("%(asctime)s - %(levelname)s - %(message)s", "%d %b %y, %H:%M:%S")
)
logger.addHandler(console)

# Azure logs
logging.getLogger("azure.storage.common.storageclient").setLevel(logging.WARNING)
logging.getLogger("azure.core.pipeline.policies.http_logging_policy").setLevel(
    logging.WARNING
)
