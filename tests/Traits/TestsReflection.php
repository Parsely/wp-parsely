<?php
/**
 * Reflection functions used by Unit and Integration Tests
 *
 * @package Parsely\Tests
 */

declare(strict_types=1);

namespace Parsely\Tests\Traits;

use Parsely\Parsely;
use ReflectionException;
use ReflectionMethod;

trait TestsReflection {
	/**
	 * Gets a method from a class. This should be used when trying to access a
	 * private method for testing.
	 *
	 * @param string       $method_name Name of the method to get.
	 * @param class-string $class_name  Name of the class the method is in.
	 * @throws ReflectionException The method does not exist in the class.
	 * @return ReflectionMethod
	 */
	public static function get_method( string $method_name, $class_name = Parsely::class ): \ReflectionMethod {
		$method = ( new \ReflectionClass( $class_name ) )->getMethod( $method_name );
		$method->setAccessible( true );

		return $method;
	}

	/**
	 * Overrides the value of a private property on a given object. This is
	 * useful when mocking the internals of a class.
	 *
	 * Note that the property will no longer be private after setAccessible is
	 * called.
	 *
	 * @param class-string $class_name The fully qualified class name, including namespace.
	 * @param object       $object_instance The object instance on which to set the value.
	 * @param string       $property_name The name of the private property to override.
	 * @param mixed        $value The value to set.
	 */
	public static function set_private_property(
		string $class_name,
		$object_instance,
		string $property_name,
		$value
	): void {
		$property = ( new \ReflectionClass( $class_name ) )->getProperty( $property_name );
		$property->setAccessible( true );
		$property->setValue( $object_instance, $value );
	}
}
