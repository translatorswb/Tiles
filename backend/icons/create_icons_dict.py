import json, csv

icons_file = open("icons_input.txt", "r")

icons = icons_file.read().splitlines()


def to_camel_case(kebab_str):
    components = kebab_str.split("-")
    # We capitalize the first letter of each component except the first one
    # with the 'title' method and join them together.
    return components[0] + "".join(x.title() for x in components[1:])


def create_readable_humanitarian_name(icon: str):
    """
    This is used to manually (copy paste) populate the 
    """
    return " ".join([word.lower() for word in icon.split("-")[1:]])


icons_structured = [
    {"iconId": icon, "iconName": create_readable_humanitarian_name(icon)}
    for icon in icons
]

human_readable = [create_readable_humanitarian_name(icon) for icon in icons]
with open("icons.json", "w") as fp:
    json.dump(icons_structured, fp)

with open("icons.csv", "w") as f:
    wr = csv.writer(f)
    for icon in human_readable:
        wr.writerow([icon])
