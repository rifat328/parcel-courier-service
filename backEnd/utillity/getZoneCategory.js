export default function getZoneCategory(district, upazila) {
  if (district === "Dhaka" && isWithinCityCorporation(upazila))
    return "Inside Dhaka";
  if (isSuburb(district)) return "Dhaka Suburbs";
  return "Outside Dhaka";
}
