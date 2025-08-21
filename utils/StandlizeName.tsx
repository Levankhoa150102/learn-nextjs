function StandardizeName(name: string) {
    const lowerName = name.toLocaleLowerCase();
    return lowerName.split(" ").map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(" ");
}

export default StandardizeName;
