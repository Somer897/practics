from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import os

driver = webdriver.Firefox()

driver.get('https://2captcha.com/ru/demo/normal')
captcha = driver.find_element(By.XPATH, value='/html/body/div[1]/div[2]/main/div/div/div[1]/section/div/form/div[1]/img')
captcha.screenshot('captcha.png')
driver.switch_to.new_window('tab')          #giving captcha

time.sleep(2)

driver.get('https://www.prepostseo.com/ru/image-to-text')
handles = driver.window_handles
f_input = driver.find_element(By.CSS_SELECTOR, "input[type='file']")          #find search

f_input.send_keys(os.path.abspath("captcha.png"))
search = driver.find_element(By.XPATH, value='/html/body/main/section[1]/div[4]/div[3]/div[1]')     #send
search.click()

time.sleep(8)
search = driver.find_element(By.XPATH, value='//*[@id="result__text0"]')           #giving
b = search.text

driver.switch_to.window(handles[0])
f_ip = driver.find_element(By.CLASS_NAME, value='_inputInner_ws73z_12')

f_ip.send_keys(b)
a = driver.find_element(By.CLASS_NAME, value='_buttonPrimary_12gs3_40')
a.click()