from queue import Empty
import subprocess

from rest_framework import status

from device import models
from device.serializers import DeviceSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

import time


def run_command(command) -> str:
    test_command = "touch /home/proxman/test12345.txt"
    # 'echo "touch /home/proxman/test123.txt" > /hostpipe/app_pipe'
    # echo "touch /home/proxman/test123.txt" > /pipes/app_pipe
    p = subprocess.run(
        f'echo "{test_command}" > /hostpipe/app_pipe',
        shell=True,
    )
    print(f"testcommand: {p}")
    if command:
        print(command)
        p = subprocess.run(
            command,
            shell=True,
        )
        print(p)
        return p.returncode
    return "No command"


class DeviceView(APIView):
    """Manage Advertiser in the database."""

    # serializer_class = serializers.DeviceSerializer
    # queryset = models.Device.objects.all()

    # authentication_class = (TokenAuthentication,)
    # permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        print("############")
        serializer = DeviceSerializer(data=request.data)
        print(request.data)

        command = ""
        r_code = 0
        if request.data["command"] == "reset_ports":
            print("Resetting all ports.")
            command = f"echo 'adb forward --remove-all' > /hostpipe/app_pipe"
            r_code = run_command(command)
            time.sleep(2)
            devices = models.Device.objects.all()
            print(devices)

            for d in devices:
                print(d.port)
                print(d.device_id)
                command = f"echo 'adb -s {d.device_id} forward tcp:{d.port} tcp:{d.port}' > /hostpipe/app_pipe"
                r_code = run_command(command)

            for idx, d in enumerate(devices):
                port = f"800{idx+1}"
                print(port)
                command = f"echo 'adb -s {d.device_id} forward tcp:{port} tcp:8886' > /hostpipe/app_pipe"
                r_code = run_command(command)

        if request.data["command"] == "airplane_fix":
            print("airplane_fix")
            id = request.data["device"]["device_id"]
            if request.data["device"]["model"] == "motorola":
                print("Motorola device, airplane FIX")
                shell = '"input keyevent 82;sleep 0.1;input keyevent 82;sleep 0.1;am start -a android.settings.AIRPLANE_MODE_SETTINGS;input tap 144 908;sleep 0.1;input keyevent 26"'
                command = (
                    f"echo 'adb -s {id} shell {shell}' > /hostpipe/app_pipe"
                )
                r_code = run_command(command)

            elif request.data["device"]["model"] == "samsung":
                print("Samsung device, airplane FIX")

                shell = '"input keyevent 82;sleep 0.1;input keyevent 82;sleep 0.1;am start -a android.settings.AIRPLANE_MODE_SETTINGS;sleep 0.1;input tap 144 408;sleep 0.1;input keyevent 26"'
                command = (
                    f"echo 'adb -s {id} shell {shell}' > /hostpipe/app_pipe"
                )
                r_code = run_command(command)

        if request.data["command"] == "change_port":

            if request.data["new_port"]:
                print("have port")
                old_port = request.data["device"]["port"]
                if old_port != request.data["new_port"]:
                    print("Not the same, update port")
                    id = request.data["device"]["device_id"]

                    shell = f"adb forward --remove tcp:{old_port}"
                    command = f"echo '{shell}'  > /hostpipe/app_pipe"
                    run_command(command)

                    new_port = request.data["new_port"]
                    shell = (
                        f"adb -s {id} forward tcp:{new_port} tcp:{new_port}"
                    )
                    command = f"echo '{shell}'  > /hostpipe/app_pipe"
                    if run_command(command) == 0:
                        models.Device.objects.filter(
                            pk=request.data["device"]["id"]
                        ).update(port=request.data["new_port"])
                else:
                    print("The same ports, no changes need.")
            else:
                print("No port change")

        if serializer.is_valid():
            # serializer.save()
            if r_code == 0:
                return Response(
                    {"message": "success", "data": request.data},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"message": "fail", "data": request.data},
                    status=status.HTTP_406_NOT_ACCEPTABLE,
                )

        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, format=None):
        device_name = request.query_params.get("reset_port_device", None)
        print(device_name)
        if device_name:

            device = models.Device.objects.filter(name_of_phone=device_name)

            if len(device) == 0:
                return Response({"Message": "Cannot find device"})

            device = device[0]
            id = device.device_id

            r_code = 99
            if device.model == "motorola":
                print("Motorola device, reset ip")
                shell = '"input keyevent 82;sleep 0.1;input keyevent 82;sleep 0.1;am start -a android.settings.AIRPLANE_MODE_SETTINGS;input tap 144 908;sleep 3;input tap 144 908;sleep 0.1;input keyevent 26"'
                command = (
                    f"echo 'adb -s {id} shell {shell}' > /hostpipe/app_pipe"
                )
                r_code = run_command(command)

            elif device.model == "samsung":
                print("Samsung device, reset ip")
                shell = '"input keyevent 82;sleep 0.1;input keyevent 82;sleep 0.1;am start -a android.settings.AIRPLANE_MODE_SETTINGS;sleep 0.1;input tap 144 408;sleep 5;input tap 144 408;sleep 2;input keyevent 26"'
                command = (
                    f"echo 'adb -s {id} shell {shell}' > /hostpipe/app_pipe"
                )
                r_code = run_command(command)

            return Response({"Message": "Changed IP", "code": r_code})

        devices = models.Device.objects.all()
        serializer = DeviceSerializer(devices, many=True)
        return Response(serializer.data)
