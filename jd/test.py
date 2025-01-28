import json
import re

a={
    'method': 'Network.requestWillBeSent',
    'params': {
        'documentURL': 'https: //mpay.m.jd.com/mpay.f62322a1720a17a44149.html?appId=m_kSqlzBic&payId=8ce143092e4844608b5d59f2533ecc4f&orderId=308833729649&tId=mpay',
        'frameId': '0ED26DA55949F8DBE8A32CFEBE884482',
        'hasUserGesture': False,
        'initiator': {
            'stack': {
                'callFrames': [
                    {
                        'columnNumber': 227300,
                        'functionName': '',
                        'lineNumber': 0,
                        'scriptId': '174',
                        'url': 'https: //misc.360buyimg.com/retail/watchtower/sdk.js'
                    },
                    {
                        'columnNumber': 45715,
                        'functionName': 'XMLHttpRequest.send',
                        'lineNumber': 2,
                        'scriptId': '167',
                        'url': 'https: //storage.360buyimg.com/babelnode/jd-jssdk/4.6.6/jd-jssdk.js'
                    },
                    {
                        'columnNumber': 26008,
                        'functionName': '',
                        'lineNumber': 0,
                        'scriptId': '161',
                        'url': 'https: //storage.360buyimg.com/jsresource/risk/handler.js'
                    },
                    {
                        'columnNumber': 24805,
                        'functionName': 't',
                        'lineNumber': 0,
                        'scriptId': '161',
                        'url': 'https: //storage.360buyimg.com/jsresource/risk/handler.js'
                    },
                    {
                        'columnNumber': 24678,
                        'functionName': 'next',
                        'lineNumber': 0,
                        'scriptId': '161',
                        'url': 'https: //storage.360buyimg.com/jsresource/risk/handler.js'
                    },
                    {
                        'columnNumber': 4129,
                        'functionName': 'onRequest',
                        'lineNumber': 0,
                        'scriptId': '161',
                        'url': 'https: //storage.360buyimg.com/jsresource/risk/handler.js'
                    },
                    {
                        'columnNumber': 24657,
                        'functionName': 't',
                        'lineNumber': 0,
                        'scriptId': '161',
                        'url': 'https: //storage.360buyimg.com/jsresource/risk/handler.js'
                    },
                    {
                        'columnNumber': 24809,
                        'functionName': '',
                        'lineNumber': 0,
                        'scriptId': '161',
                        'url': 'https: //storage.360buyimg.com/jsresource/risk/handler.js'
                    },
                    {
                        'columnNumber': 22767,
                        'functionName': 'i',
                        'lineNumber': 0,
                        'scriptId': '161',
                        'url': 'https: //storage.360buyimg.com/jsresource/risk/handler.js'
                    },
                    {
                        'columnNumber': 27113,
                        'functionName': 'n',
                        'lineNumber': 2,
                        'scriptId': '167',
                        'url': 'https: //storage.360buyimg.com/babelnode/jd-jssdk/4.6.6/jd-jssdk.js'
                    }
                ]
            },
            'type': 'script'
        },
        'loaderId': '800405FD177F2854FAEC50D5D3A78C82',
        'redirectHasExtraInfo': False,
        'request': {
            'hasPostData': True,
            'headers': {
                'Referer': 'https: //mpay.m.jd.com/',
                'User-Agent': '',
                'content-type': 'text/plain',
                'sec-ch-ua': '',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"macOS"'
            },
            'initialPriority': 'High',
            'isSameSite': True,
            'method': 'POST',
            'mixedContentType': 'none',
            'postData': {
                "report_ts": "1737046003038",
                "scr": "1440x900",
                "token": "68bb9de6a3b10d10e9ee915d8b50590e",
                "ut": "s",
                "clt": "web",
                "jvr": "3.1.15",
                "std": "MO-J2011-1",
                "tpc": "traffic-jdm.cl",
                "uuid": "17369573964001941529164",
                "cli": "M-M",
                "biz": "mba",
                "mba_muid": "17369573964001941529164",
                "mba_sid": "17370459886905691406110828485",
                "proj_id": "3",
                "reserved3": "122270672.17369573964001941529164.1736957396.1736957396.1737045988.2_122270672_direct_-_none_-_1736957396403_122270672.4.17369573964001941529164_2.1737045988__122270672.4.17369573964001941529164_2.1737045988___",
                "osp": "mac",
                "osv": "10.15.7",
                "data": [
                    {
                        "ma_route_ready": "0",
                        "ma_log_id": "17369573964001941529164-1737046003038-286157073",
                        "ma_pv_log_id": "17369573964001941529164-1737046003025-211614327",
                        "ref": "https://trade.m.jd.com/",
                        "ctm": "1737046003038",
                        "pin": "jd_44754e08b8767",
                        "ctp": "https://mpay.m.jd.com/mpay.f62322a1720a17a44149.html",
                        "par": "appId=m_kSqlzBic&payId=8ce143092e4844608b5d59f2533ecc4f&orderId=308833729649&tId=mpay",
                        "usc": "direct",
                        "umd": "none",
                        "utr": "-",
                        "ucp": "-",
                        "jdv": "122270672|direct|-|none|-|1736957396403",
                        "vts": 2,
                        "seq": 4,
                        "browser_ver": "132.0.0.0",
                        "browser": "Chrome",
                        "fst": 1736957396,
                        "pst": 1736957396,
                        "vct": 1737045988,
                        "clr": "24-bit",
                        "bsl": "zh-cn",
                        "bsc": "UTF-8",
                        "jav": 0,
                        "flv": "",
                        "tit": "京东收银台",
                        "hash": "",
                        "tad": "1",
                        "dataver": "0.1",
                        "is_wq": 0,
                        "chan_type": 3,
                        "ma_trafficmap_mode": "0",
                        "typ": "cl",
                        "lgt": "cl",
                        "tar": "",
                        "mba_seq": "4",
                        "event_id": "MCashierNew_SecToastEntranceExpo",
                        "page_id": "Cashier_Home",
                        "unpl": "",
                        "mjds": "",
                        "page_name": "https://mpay.m.jd.com/mpay.f62322a1720a17a44149.html",
                        "page_param": "appId=m_kSqlzBic&payId=8ce143092e4844608b5d59f2533ecc4f&orderId=308833729649&tId=mpay",
                        "json_param": "{appid:m_kSqlzBic}"
                    }
                ]
            },
            'postDataEntries': [
                {
                    'bytes': 'eyJwaW5fc2lkIjoiIiwicmVwb3J0X3RzIjoiMTczNzA0NjAwMzAzOCIsInNjciI6IjE0NDB4OTAwIiwidG9rZW4iOiI2OGJiOWRlNmEzYjEwZDEwZTllZTkxNWQ4YjUwNTkwZSIsInV0IjoicyIsImNsdCI6IndlYiIsImp2ciI6IjMuMS4xNSIsInN0ZCI6Ik1PLUoyMDExLTEiLCJ0cGMiOiJ0cmFmZmljLWpkbS5jbCIsInV1aWQiOiIxNzM2OTU3Mzk2NDAwMTk0MTUyOTE2NCIsImNsaSI6Ik0tTSIsImJpeiI6Im1iYSIsIm1iYV9tdWlkIjoiMTczNjk1NzM5NjQwMDE5NDE1MjkxNjQiLCJtYmFfc2lkIjoiMTczNzA0NTk4ODY5MDU2OTE0MDYxMTA4Mjg0ODUiLCJwcm9qX2lkIjoiMyIsInJlc2VydmVkMyI6IjEyMjI3MDY3Mi4xNzM2OTU3Mzk2NDAwMTk0MTUyOTE2NC4xNzM2OTU3Mzk2LjE3MzY5NTczOTYuMTczNzA0NTk4OC4yXzEyMjI3MDY3Ml9kaXJlY3RfLV9ub25lXy1fMTczNjk1NzM5NjQwM18xMjIyNzA2NzIuNC4xNzM2OTU3Mzk2NDAwMTk0MTUyOTE2NF8yLjE3MzcwNDU5ODhfXzEyMjI3MDY3Mi40LjE3MzY5NTczOTY0MDAxOTQxNTI5MTY0XzIuMTczNzA0NTk4OF9fXyIsIm9zcCI6Im1hYyIsIm9zdiI6IjEwLjE1LjciLCJkYXRhIjpbeyJtYV9yb3V0ZV9yZWFkeSI6IjAiLCJtYV9sb2dfaWQiOiIxNzM2OTU3Mzk2NDAwMTk0MTUyOTE2NC0xNzM3MDQ2MDAzMDM4LTI4NjE1NzA3MyIsIm1hX3B2X2xvZ19pZCI6IjE3MzY5NTczOTY0MDAxOTQxNTI5MTY0LTE3MzcwNDYwMDMwMjUtMjExNjE0MzI3IiwicmVmIjoiaHR0cHM6Ly90cmFkZS5tLmpkLmNvbS8iLCJjdG0iOiIxNzM3MDQ2MDAzMDM4IiwicGluIjoiamRfNDQ3NTRlMDhiODc2NyIsImN0cCI6Imh0dHBzOi8vbXBheS5tLmpkLmNvbS9tcGF5LmY2MjMyMmExNzIwYTE3YTQ0MTQ5Lmh0bWwiLCJwYXIiOiJhcHBJZD1tX2tTcWx6QmljJnBheUlkPThjZTE0MzA5MmU0ODQ0NjA4YjVkNTlmMjUzM2VjYzRmJm9yZGVySWQ9MzA4ODMzNzI5NjQ5JnRJZD1tcGF5IiwidXNjIjoiZGlyZWN0IiwidW1kIjoibm9uZSIsInV0ciI6Ii0iLCJ1Y3AiOiItIiwiamR2IjoiMTIyMjcwNjcyfGRpcmVjdHwtfG5vbmV8LXwxNzM2OTU3Mzk2NDAzIiwidnRzIjoyLCJzZXEiOjQsImJyb3dzZXJfdmVyIjoiMTMyLjAuMC4wIiwiYnJvd3NlciI6IkNocm9tZSIsImZzdCI6MTczNjk1NzM5NiwicHN0IjoxNzM2OTU3Mzk2LCJ2Y3QiOjE3MzcwNDU5ODgsImNsciI6IjI0LWJpdCIsImJzbCI6InpoLWNuIiwiYnNjIjoiVVRGLTgiLCJqYXYiOjAsImZsdiI6IiIsInRpdCI6IuS6rOS4nOaUtumTtuWPsCIsImhhc2giOiIiLCJ0YWQiOiIxIiwiZGF0YXZlciI6IjAuMSIsImlzX3dxIjowLCJjaGFuX3R5cGUiOjMsIm1hX3RyYWZmaWNtYXBfbW9kZSI6IjAiLCJ0eXAiOiJjbCIsImxndCI6ImNsIiwidGFyIjoiIiwibWJhX3NlcSI6IjQiLCJldmVudF9pZCI6Ik1DYXNoaWVyTmV3X1NlY1RvYXN0RW50cmFuY2VFeHBvIiwicGFnZV9pZCI6IkNhc2hpZXJfSG9tZSIsInVucGwiOiIiLCJtamRzIjoiIiwicGFnZV9uYW1lIjoiaHR0cHM6Ly9tcGF5Lm0uamQuY29tL21wYXkuZjYyMzIyYTE3MjBhMTdhNDQxNDkuaHRtbCIsInBhZ2VfcGFyYW0iOiJhcHBJZD1tX2tTcWx6QmljJnBheUlkPThjZTE0MzA5MmU0ODQ0NjA4YjVkNTlmMjUzM2VjYzRmJm9yZGVySWQ9MzA4ODMzNzI5NjQ5JnRJZD1tcGF5IiwianNvbl9wYXJhbSI6IntcImFwcGlkXCI6XCJtX2tTcWx6QmljXCJ9In1dfQ=='
                }
            ],
            'referrerPolicy': 'strict-origin-when-cross-origin',
            'url': 'https: //uranus.jd.com/log/m?std=MO-J2011-1'
        },
        'requestId': '44096.651',
        'timestamp': 661170.933735,
        'type': 'XHR',
        'wallTime': 1737046003.061012
    }
}
pattern = "orderId=(.*?)&"

match = re.search(pattern, json.dumps(a))
print(match.group(1)=="308833729649")
print(type(match.group(1)))